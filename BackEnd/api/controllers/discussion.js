const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const Discussion = require('../models/discussion');
const Student = require('../models/student');
const Educator = require('../models/educator');
const Course = require('../models/course');


exports.addMessage = async (req, res, next) => {
    try {
        req.userData = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_KEY);

        const message = {
            message: req.body.message,
            createdByStudent: req.userData.userId,
        };

        const course = await Course.findById(req.params.courseId).exec();

        if (!course) {
            return res.status(404).json({
                message: 'Course not found'
            });
        }

        if (!course.discussionForum) {
            return res.status(404).json({
                message: 'This course does not have a discussion forum'
            });
        }

        const discussionId = course.discussionForum;
        const discussion = await Discussion.findById(discussionId).exec();

        discussion.messages.push(message);
        await discussion.save();

        res.status(201).json({
            message: 'Message added to discussion forum'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};
