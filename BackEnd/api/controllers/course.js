const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const moment = require("moment");
const PDFDocument = require("pdfkit");

const Course = require('../models/course');
const Token = require("../models/token");
const Educator = require("../models/educator");
const Student = require("../models/student");
const Discussion = require("../models/discussion");
const Assignment = require('../models/assignment');
const Section = require('../models/section');
const Certificate = require('../models/certificate');
const Submission = require('../models/submission');

const sendEmail = require("../../utils/sendEmail");
const {deleteFile, deleteFolder} = require("../../utils/deleteFile");


exports.createCourse = async (req, res, next) => {
    try {
        let thumbnail = null;
        if (req.file) {
            thumbnail = req.file.path;
        }

        const course = await Course.findOne({courseCode: req.body.courseCode}).exec();
        if (course) {
            return res.status(409).json({
                message: 'Course code already exist'
            });
        }

        const newCourse = new Course({
            courseTitle: req.body.courseTitle,
            courseDescription: req.body.courseDescription,
            courseDescriptionLong: req.body.courseDescriptionLong,
            coursePrice: req.body.coursePrice,
            thumbnail: thumbnail,
            tags: req.body.tags,
            courseLevel: req.body.courseLevel,
            courseCode: req.body.courseCode,
            language: req.body.language,
            visibility: req.body.visibility,
            prerequisites: req.body.prerequisites,
            createdBy: req.userData.userId
        });

        await newCourse.save();

        let discussionId;
        if (req.body.discussionForum === "true") {
            const newDiscussion = new Discussion({
                messages: []
            });
            await newDiscussion.save();
            discussionId = newDiscussion._id;
        }
        newCourse.discussionForum = discussionId;

        await newCourse.save();

        const educator = await Educator.findById(req.userData.userId).exec();
        educator.courseCreated.push(newCourse._id);
        await educator.save();

        return res.status(201).json({
            message: 'Course created',
            course: newCourse
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            error: err
        });
    }
}

exports.editCourse = async (req, res, next) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findById(courseId).exec();

        if (!course) {
            return res.status(404).json({
                message: 'Course not found'
            });
        }

        let oldThumbLink = course.thumbnail;
        const newFolderName = `${req.body.courseCode}-${req.body.courseTitle}`;
        const newPath = path.join(__dirname, `../../uploads/course/${newFolderName}`);

        if (req.file && oldThumbLink != null && course.courseTitle != req.body.courseTitle) {
            oldThumbLink = newPath + '/' + path.basename(oldThumbLink);
            deleteFile(oldThumbLink);
        }

        req.body.thumbnail = req.file.path;
        const updateData = req.body;

        const sections = course.courseSections;
        for (let i = 0; i < sections.length; i++) {
            const section = await Section.findById(sections[i]).exec();
            if (section) {
                for (let i = 0; i < section.posts.length; i++) {
                    for (let j = 0; j < section.posts[i].attachments.length; j++) {
                        let filePath = section.posts[i].attachments[j];
                        filePath = filePath.replace(course.courseTitle, req.body.courseTitle);
                        console.log(filePath);
                        section.posts[i].attachments[j] = filePath;
                    }
                }
                await section.save();
            }
        }
        await course.save();
        await Course.updateOne({_id: courseId}, {$set: updateData}).exec();

        return res.status(200).json({
            message: 'Course updated'
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            error: err
        });
    }
}

exports.deleteCourse = async (req, res, next) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findOne({_id: courseId}).exec();

        if (!course) {
            return res.status(404).json({
                message: 'Course not found'
            });
        }

        if (course.createdBy.toString() !== req.userData.userId.toString()) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }

        let token = await Token.findOne({userId: req.userData.userId});
        if (!token) {
            token = new Token({
                userId: req.userData.userId,
                token: crypto.randomBytes(16).toString('hex')
            });
            await token.save();
        }

        const user = await Educator.findOne({email: req.userData.email}).exec();

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const subject = `Want to delete your course` + ` [` + `${course.courseTitle}` + `] ?`;

        const body = `
              <html>
                <head>
                  <style>
                    /* Define your CSS styles here */
                    body {
                      font-family: Arial, sans-serif;
                      background-color: #f4f4f4;
                    }
                    .container {
                      max-width: 600px;
                      margin: 0 auto;
                      padding: 20px;
                      background-color: #ffffff;
                      border-radius: 5px;
                      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    a {
                      color: #007bff;
                      text-decoration: none;
                    }
                    img {
                      max-width: 100%; /* Ensure the image fits within its parent container */
                      height: auto; /* Maintain the aspect ratio */
                      display: block; /* Remove any extra spacing around the image */
                      margin: 0 auto; /* Center the image horizontally */
                    }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <img src="https://i.ibb.co/sHdDQCH/Logo.png" alt="Common Ground" />
                    <p>Hello ${user.username},</p>
                    <p>You have requested to delete your course titled "${course.courseTitle}".</p>
                    <p>To confirm the deletion, please click on the following link:</p>
                    <p><a href="http://localhost:3000/educator/delete-course/${courseId}/${token.token}">Delete course</a></p>
                    <p>If you didn't request this, you can safely ignore this email.</p>
                    <p>Best regards,<br />Common Ground</p>
                  </div>
                </body>
              </html>
            `;

        await sendEmail(req.userData.email, subject, body);

        return res.status(200).json({
            message: 'Email sent successfully',
        });

    } catch (err) {
        return res.status(500).json({
            error: err
        });
    }
}

exports.sudoDeleteLecture = async (req, res, next) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findById(courseId).exec();

        if (!course) {
            return res.status(404).json({
                message: 'Course not found'
            });
        }

        const token = await Token.findOne({token: req.params.token}).exec();
        if (!token) {
            return res.status(404).json({
                message: 'Token not found - Educator'
            });
        }

        await Token.deleteOne({token: req.params.token}).exec();

        if (course.discussionForum) {
            await Discussion.deleteOne({_id: course.discussionForum}).exec();
        }

        const coursePath = `uploads\\course\\${course.courseCode}-${course.courseTitle}`;

        if (fs.existsSync(coursePath)) {
            deleteFolder(coursePath);
        }

        const assignments = course.courseAssignments;
        await Assignment.deleteMany({_id: {$in: assignments}}).exec();

        const sections = course.courseSections;
        await Section.deleteMany({_id: {$in: sections}}).exec();

        await Discussion.deleteOne({_id: course.discussionForum}).exec();

        const students = course.enrolledStudents;
        for (let i = 0; i < students.length; i++) {
            const student = await Student.findById(students[i]).exec();
            student.enrolledCourses.pull(courseId);
            await student.save();
        }

        const educator = await Educator.findById(req.userData.userId).exec();
        educator.courseCreated.pull(req.params.courseId);
        await educator.save();

        await Course.deleteOne({_id: courseId}).exec();

        return res.status(200).json({
            message: 'Course deleted'
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
}
exports.enrollCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId).exec();

        if (!course) {
            return res.status(404).json({
                message: 'Course not found'
            });
        }
        if (course.visibility === 'private') {
            return res.status(401).json({
                message: 'It is a private course'
            });
        }

        if (course.enrolledStudents.includes(req.userData.userId)) {
            return res.status(401).json({
                message: 'Already enrolled'
            });
        }

        course.enrolledStudents.push(req.userData.userId);

        const student = await Student.findById(req.userData.userId).exec();
        student.enrolledCourses.push(req.params.courseId);

        await course.save();
        await student.save();

        return res.status(200).json({
            message: 'Enrolled'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
}

exports.unenrollCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId).exec();

        if (!course) {
            return res.status(404).json({
                message: 'Course not found'
            });
        }

        const student = await Student.findById(req.userData.userId).exec();
        student.enrolledCourses.pull(req.params.courseId);
        course.enrolledStudents.pull(req.userData.userId);

        await course.save();
        await student.save();

        return res.status(200).json({
            message: 'Unenrolled Successfully'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
};

exports.removeStudent = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId).exec();

        if (!course) {
            return res.status(404).json({
                message: 'Course not found'
            });
        }

        const student = await Student.findById(req.params.studentId).exec();
        student.enrolledCourses.pull(req.params.courseId);
        course.enrolledStudents.pull(req.params.studentId);

        await course.save();
        await student.save();

        return res.status(200).json({
            message: 'Student removed'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
}

exports.rateCourse = async (req, res, next) => {
    try {
        const ans = await Course.findOne({_id: req.params.courseId, 'courseFeedback.student': req.userData.userId}).select('courseFeedback').exec();
        if (ans != null) {
            return res.status(401).json({
                message: 'Already rated'
            });
        }

        const course = await Course.findById(req.params.courseId).exec();
        if (!course) {
            return res.status(404).json({
                message: 'Course not found'
            });
        }

        if (course.enrolledStudents.includes(req.userData.userId)) {
            const feedback = {
                student: req.userData.userId,
                rating: req.body.rating,
                comment: req.body.comment
            };

            course.rating = (course.rating + req.body.rating) / (course.courseFeedback.length + 1);
            course.courseFeedback.push(feedback);
            await course.save();
        }
        return res.status(200).json({
            message: 'Rated Successfully'
        });

    } catch (err) {
        return res.status(500).json({
            error: err
        });
    }
}

exports.getCertificate = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId).exec();
        if (!course) {
            return res.status(404).json({
                message: 'Course not found'
            });
        }

        const educator = await Educator.findById(course.createdBy).exec();
        if (!educator) {
            return res.status(404).json({
                message: 'Educator not found'
            });
        }

        const student = await Student.findById(req.userData.userId).exec();
        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        let certificate = await Certificate.findOne({course: req.params.courseId, student: req.userData.userId}).exec();
        if (!certificate) {
            const assignments = await Assignment.find({
                course: req.params.courseId,
                submission: { $ne: [] } // Exclude assignments with empty submissions
            })
                .populate({
                    path: 'submission',
                    match: { submittedBy: req.userData.userId },
                })
                .exec();

            const courseAssignments = course.courseAssignments;
            if (assignments.length !== courseAssignments.length) {
                return res.status(401).json({
                    message: 'Please First Complete All Assignments'
                });
            }

            console.log('Certificate not found');
            certificate = new Certificate({
                student: req.userData.userId,
                educator: course.createdBy,
                course: req.params.courseId,
            });
            await certificate.save();
            await student.certificates.push(certificate._id);
            await student.save();
        }

        const dateCreated = certificate.dateCreated;
        const day = dateCreated.getDate().toString().padStart(2, '0');
        const month = (dateCreated.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
        const year = dateCreated.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;

        let pdfName = course.courseCode + '-' + course.courseTitle + " Certificate";

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
            'Content-Disposition',
            'inline; filename="' + pdfName + '.pdf"'
        );

        // certificate pdf
        const doc = new PDFDocument({
            layout: "landscape",
            size: "A4",
        });

        // doc.pipe(fs.createWriteStream(`${pdfName}.pdf`));
        doc.pipe(res);

        const imageWidth = 842;
        const imageHeight = 595;
        const x = 0;
        const y = 0;

        const fontPath = path.join(__dirname, "../../uploads/font/source-serif-pro.regular.ttf");
        const fontPath2 = path.join(__dirname, "../../uploads/font/Chomsky.ttf");

        const imagePath = path.join(__dirname, "../../uploads/certificate/certificate.jpg");
        doc.image(imagePath, x, y, { width: imageWidth, height: imageHeight });
        function addWrappedText(text, yPos, width, fontSize, lineSpacing, font) {
            doc
                .font(font)
                .fontSize(fontSize)
                .text(text, x + 60, yPos, { width: width, lineGap: lineSpacing });
        }

        let yPos = 180;
        addWrappedText(`${formattedDate}`, yPos, 400, 10, 5, fontPath);
        yPos += doc.heightOfString(`${formattedDate}`, { width: 400 }) + 15;

        addWrappedText(`${student.fname} ${student.lname}`, yPos, 400, 27, 5, fontPath2);
        yPos += doc.heightOfString(`${student.username}`, { width: 400 }) + 20;

        addWrappedText("has successfully completed", yPos, 400, 12, 5, fontPath);
        yPos += doc.heightOfString("has successfully completed", { width: 400 }) + 20;

        addWrappedText(`${course.courseCode}` + '-' + `${course.courseTitle}`, yPos, 400, 27, 5, fontPath2);
        yPos += doc.heightOfString(`${course.courseCode}\` + '-' + \`${course.courseTitle}`, { width: 400 }) + 20;

        addWrappedText(`an online non-credit course authorized by ${educator.fname}` + ' ' + `${educator.lname} and offered through Common Ground.`, yPos, 400, 12, 5, fontPath);
        yPos += doc.heightOfString(`an online non-credit course authorized by ${educator.fname}` + ' ' + `${educator.lname} and offered through Common Ground.`, { width: 400 }) + 50;

        addWrappedText(`${educator.fname}` + " " + `${educator.lname}`, yPos, 400, 27, 5, fontPath2);
        doc.text(`${educator.fname}` + " " + `${educator.lname}`, x + 60, yPos, { width: 400, lineGap: 5, underline: true });

        yPos += doc.heightOfString(`${educator.fname}` + " " + `${educator.lname}`, { width: 400 }) + 5;

        doc
            .font(fontPath)
            .fontSize(7)
            .text(`Verify at coursera.org/file/verify/${certificate._id}`, 575, 485);

        doc
            .font(fontPath)
            .fontSize(7)
            .text("Common Ground has confirmed the identity of this individual and their participation in the course.", 575, 500, { width: 200 });

        doc.end();

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
}