const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const Course = require('../models/course');
const Token = require("../models/token");
const Educator = require("../models/educator");
const Student = require("../models/student");
const Discussion = require("../models/discussion");

const sendEmail = require("../../utils/sendEmail");
const {deleteFile, deleteFolder} = require("../../utils/deleteFile");


exports.createCourse = async (req, res, next) => {
    try {
        req.userData = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_KEY);

        let discussionId;
        if (req.body.discussionForum === "true") {
            const newDiscussion = new Discussion({
                messages: []
            });
            await newDiscussion.save();
            discussionId = newDiscussion._id;
        }

        let thumbnail = null;
        if (req.file) {
            thumbnail = req.file.path;
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
            prerequisites: req.body.prerequisites,
            createdBy: req.userData.userId,
            discussionForum: discussionId,
        });

        await newCourse.save();
        res.status(201).json({
            message: 'Course created'
        });
    } catch
        (err) {
        console.log(err);
        res.status(500).json({
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

        // pending work
        // const oldThumbLink = course.thumbnail;
        // const newFolderName = `${req.body.courseCode}+'-'+${req.body.courseTitle}`;
        // const regex = /uploads\/course\/([^/]+)/;
        // const newLink = oldThumbLink.replace(regex, `uploads/course/${newFolderName}`);
        // // console.log(newLink);
        // // console.log(oldThumbLink);
        // if (req.file)
        //     deleteFile(newLink);

        const updateData = req.body;

        // const newThumbnail = req.file ? req.file.path : null;

        await Course.updateOne({_id: courseId}, {$set: updateData}).exec();

        res.status(200).json({
            message: 'Course updated'
        });
    } catch
        (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}

exports.deleteCourse = async (req, res, next) => {
    try {
        req.userData = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_KEY);

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
                    <img src="https://user-images.githubusercontent.com/94957904/268924860-0c79050a-ab46-47ab-856c-f26909c185df.jpg" alt="Common Ground" />
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

    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
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
        deleteFolder(coursePath);

        await Course.deleteOne({_id: courseId}).exec();

        return res.status(200).json({
            message: 'Course deleted'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
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

        req.userData = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_KEY);
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
        res.status(500).json({
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

        req.userData = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_KEY);

        course.enrolledStudents.pull(req.userData.userId);
        await course.save();

        return res.status(200).json({
            message: 'Unenrolled'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}