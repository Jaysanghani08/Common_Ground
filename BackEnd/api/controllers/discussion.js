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

        let message;
        if (req.userData.userType === 'student') {
            message = {
                message: req.body.message,
                createdByStudent: req.userData.userId
            }
        }
        else {
            message = {
                message: req.body.message,
                createdByEducator: req.userData.userId
            }
        }

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

exports.editMessage = async (req, res, next) => {
    try {
        req.userData = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_KEY);

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

        const message = discussion.messages.id(req.params.messageId);

        if (!message) {
            return res.status(404).json({
                message: 'Message not found'
            });
        }

        if (message.createdByStudent.toString() !== req.userData.userId.toString()) {
            return res.status(403).json({
                message: 'You are not authorized to edit this message'
            });
        }

        message.message = req.body.message;
        await discussion.save();

        res.status(200).json({
            message: 'Message edited'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.deleteMessage = async (req, res, next) => {
    try {
        req.userData = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_KEY);

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

        const message = discussion.messages.id(req.params.messageId);

        if (!message) {
            return res.status(404).json({
                message: 'Message not found'
            });
        }

        if (message.createdByStudent.toString() !== req.userData.userId.toString()) {
            return res.status(403).json({
                message: 'You are not authorized to delete this message'
            });
        }

        await discussion.messages.pull(req.params.messageId);
        await discussion.save();

        res.status(200).json({
            message: 'Message deleted'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};