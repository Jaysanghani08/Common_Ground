const multerProfile = require("multer");
const path = require("path");
const fs = require("fs")
;
const Course = require('../models/course');

const storage = multerProfile.diskStorage({
    destination: async function (req, file, cb) {
        const courseCode = req.body.courseCode;
        const courseTitle = req.body.courseTitle;

        const courseID = req.params.courseId;
        try {
            if (courseID) {
                const existingCourse = await Course.findById(courseID);

                if (existingCourse) {
                    const oldDirectoryName = existingCourse.courseCode + '-' + existingCourse.courseTitle;
                    const newDirectoryName = courseCode + '-' + courseTitle;

                    const courseDirectory = path.join('./uploads/course', oldDirectoryName);
                    const newCourseDirectory = path.join('./uploads/course', newDirectoryName);

                    if (fs.existsSync(courseDirectory)) {
                        fs.renameSync(courseDirectory, newCourseDirectory);
                        console.log('Directory already exists and renamed');
                    }

                    console.log(newCourseDirectory);
                    cb(null, newCourseDirectory);
                } else {
                    console.error('Course not found in the database');
                    cb('Course not found in the database', null);
                }
            } else {
                const courseDirectory = path.join('./uploads/course', courseCode + '-' + courseTitle);
                fs.mkdir(courseDirectory, { recursive: true }, (err) => {
                    if (err) {
                        return console.error(err);
                    }
                    console.log('Directory created successfully');
                    cb(null, courseDirectory);
                });
            }
        } catch (err) {
            console.error('Database error:', err);
            cb('Database error', null);
        }
    },
    filename: function (req, file, cb) {
        cb(null, req.body.courseTitle + path.extname(file.originalname));
    }
});

const course = multerProfile({ storage: storage });

module.exports = { course };
