const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const Course = require('../models/course');
const Educator = require('../models/educator');
const Student = require('../models/student');

exports.getAllCourse = async (req, res, next) => {
    try {
        const courses = await Course.find();

        return res.status(200).json({
            courses: courses
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
}

exports.getCourseByEducator = async (req, res, next) => {
    try {
        const courses = await Course.find({ createdBy: req.userData.userId }).select('_id courseTitle courseDescription coursePrice courseLevel courseCode language rating createdBy').populate('createdBy', 'fname lname').exec();

        if (!courses) {
            return res.status(404).json({
                message: 'This educator has no courses'
            });
        }

        return res.status(200).json({
            courses: courses
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
}

exports.getEnrolledCourse = async (req, res, next) => {
    try {
        const courses = await Course.find({enrolledStudents: req.query.studentId}).exec();

        if (!courses) {
            return res.status(200).json({
                message: 'You have not enrolled in any courses yet'
            });
        }

        return res.status(200).json({
            courses: courses
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
};

exports.searchFilter = async (req, res, next) => {
    try {
        let filters = {
            visibility: "public"
        };

        if (req.query.title) {
            filters.courseTitle = { $regex: new RegExp(req.query.title, 'i') };
        }
        if (req.query.price) {
            filters.coursePrice = { $lte: req.query.price };
        }
        if (req.query.tag) {
            const tags = req.query.tag.split(',');
            filters.tags = { $in: tags };
        }
        if (req.query.level) {
            filters.courseLevel = req.query.level;
        }
        if (req.query.language) {
            filters.language = req.query.language;
        }
        // if (req.query.prerequisites) {
        //     const prerequisites = req.query.prerequisites.split(',');
        //     filters.prerequisites = { $in: prerequisites };
        // }
        if (req.query.rating) {
            filters.rating = { $gte: req.query.rating };
        }
        if (req.query.courseCode) {
            filters.courseCode = { $regex: new RegExp(req.query.courseCode, 'i') };
        }

        const courses = await Course.find(filters)
            .select('_id courseTitle courseDescription coursePrice courseLevel courseCode language rating createdBy')
            .populate('createdBy', 'fname lname')
            .exec();

        return res.status(200).json({
            courses: courses
        });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({
            error: err.message
        });
    }
}


exports.getDashboard = async (req, res, next) => {
    try {
        if (req.userData.userType != "educator") {
            return res.status(401).json({
                message: 'This is not an educator account'
            });
        }

        const courses = await Course.find({createdBy: req.userData.userId}).exec();

        // total Earning
        let totalEarning = 0;
        let totalStudent = 0;
        let totalCourses = courses.length;
        for (let i = 0; i < courses.length; i++) {
            totalEarning += courses[i].coursePrice * courses[i].enrolledStudents.length;
            totalStudent += courses[i].enrolledStudents.length;
            console.log(totalEarning, courses[i].coursePrice, courses[i].enrolledStudents.length);
        }

        let rate = 0;
        for (let i = 0; i < courses.length; i++) {
            rate += courses[i].rating;
        }
        let avgRating = rate / courses.length;
        return res.status(200).json({
            totalEarning: totalEarning,
            totalStudent: totalStudent,
            totalCourses: totalCourses,
            avgRating: avgRating
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
}

exports.getProfile = async (req, res, next) => {
    try {
        if (req.userData.userType == "educator") {
            //     select fname, lname, gender, location, dob, username, phone, email, upiID, bio, profilePic
            const educator = await Educator.findById(req.userData.userId).select('fname lname gender location dob username phone email upiID bio profilePic').exec();
            if (!educator) {
                return res.status(404).json({
                    message: 'Educator not found'
                });
            }
            return res.status(200).json({
                educator: educator
            });
        } else if (req.userData.userType == "student") {
            const student = await Student.findById(req.userData.userId).select('fname lname gender dob username phone email bio profilePic interests').exec();
            if (!student) {
                return res.status(404).json({
                    message: 'Student not found'
                });
            }
            return res.status(200).json({
                student: student
            });
        }
        return res.status(404).json({
            message: 'User not found'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
};

exports.getCourses = async (req, res, next) => {
    try {
        const courses = await Course.find({visibility: "public"}).select('_id courseTitle courseDescription coursePrice courseLevel courseCode language prerequisites').exec();
        if (!courses) {
            return res.status(404).json({
                message: 'No courses found'
            });
        }
        return res.status(200).json({
            courses: courses
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
};

exports.getEnrolledCourse = async (req, res, next) => {
    try {
        let enrolledCourses = await Student.findById(req.userData.userId).populate('enrolledCourses').exec();
        console.log(enrolledCourses);

        enrolledCourses = enrolledCourses.enrolledCourses;
        enrolledCourses = enrolledCourses.map(course => {
            return {
                _id: course._id,
                courseTitle: course.courseTitle,
                courseDescription: course.courseDescription,
                courseDescriptionLong: course.courseDescriptionLong,
                coursePrice: course.coursePrice,
                courseLevel: course.courseLevel,
                courseCode: course.courseCode,
                courseSections: course.courseSections,
                courseAssignments: course.courseAssignments,
                language: course.language,
                prerequisites: course.prerequisites,
                courseFeedback: course.courseFeedback
            }
        });

        return res.status(200).json({
            courses: enrolledCourses
        });
    } catch
        (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
}

exports.getCourse = async (req, res, next) => {
    try {
        const course = await Course.findById({_id :req.params.courseId, visibility: 'public'}).select('_id courseTitle courseDescriptionLong coursePrice courseLevel courseCode courseSections courseAssignments language prerequisites rating courseFeedback discussionForum enrolledStudents createdBy').populate('courseSections').populate('courseAssignments').populate('discussionForum').populate({path: 'enrolledStudents', model: 'Student', select: 'username'}).exec();
        if (!course) {
            return res.status(404).json({
                message: 'Course not found'
            });
        }

        const educator = await Educator.findById(course.createdBy).select('fname lname username').exec();
        if (!educator) {
            return res.status(404).json({
                message: 'Educator not found'
            });
        }

        course.createdBy = educator;

        return res.status(200).json({
            course: course
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
}

exports.getRecommendedCourse = async (req, res, next) => {
    try {
        const courses = await Course.aggregate([
            {
                $match: {
                    enrolledStudents: { $exists: true, $ne: [] },
                },
            },
            {
                $project: {
                    courseTitle: 1,
                    courseDescription: 1,
                    coursePrice: 1,
                    courseLevel: 1,
                    courseCode: 1,
                    language: 1,
                    rating: 1,
                    ratio: { $multiply: [{ $size: '$enrolledStudents' }, '$rating'] },
                    createdBy: 1, // Include the createdBy field to be used for $lookup
                },
            },
            {
                $sort: { ratio: -1 },
            },
            {
                $limit: 5,
            },
            {
                $lookup: {
                    from: 'educators', // Replace 'educators' with the actual collection name where educators are stored
                    localField: 'createdBy',
                    foreignField: '_id',
                    as: 'educator',
                },
            },
            {
                $unwind: '$educator', // Convert the 'educator' array to an object
            },
            {
                $project: {
                    _id: 1,
                    courseTitle: 1,
                    courseDescription: 1,
                    coursePrice: 1,
                    courseLevel: 1,
                    courseCode: 1,
                    language: 1,
                    rating: 1,
                    ratio: 1,
                    createdBy: {
                        fname: '$educator.fname',
                        lname: '$educator.lname',
                    },
                },
            },
        ]);


        if (!courses) {
            return res.status(404).json({
                message: 'No courses found'
            });
        }

        return res.status(200).json({
            courses: courses
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
}

exports.generateGraph = async (req, res, next) => {
    try {
    //     sort by latest created date

        const courses = await Course.find({createdBy: req.userData.userId}).sort({dateCreated: -1}).exec();
        if (!courses) {
            return res.status(404).json({
                message: 'No courses found'
            });
        }

        let labels = [];
        let data = [];
        for (let i = 0; i < courses.length; i++) {
            labels.push(courses[i].courseTitle);
            data.push(courses[i].enrolledStudents.length);
        }
        return res.status(200).json({
            courseTitle: labels,
            enrolled: data
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
}