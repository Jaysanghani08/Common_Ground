const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const Section = require('../models/section');
const Educator = require('../models/educator');
const Course = require('../models/course');


exports.createSection = async (req, res, next) => {
    try {
        req.userData = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_KEY);
        const course = await Course.findById(req.params.courseId).exec();
        if (!course) {
            return res.status(404).json({
                message: 'Course not found'
            });
        }
        console.log(course.createdBy);
        console.log(req.userData.userId);
        if (course.createdBy.toString() !== req.userData.userId.toString()) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }

        const post = {
            title: req.body.title,
            body: req.body.body,
            attachments: req.body.attachments
        };
        const section = new Section({
            title: req.body.sectionTitle,
            posts: post
        });

        await section.save();
        course.courseSections.push(section._id);
        await course.save();

        res.status(201).json({
            message: 'Section created'
        });
    } catch
        (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.editSection = async (req, res, next) => {
    try {
        req.userData = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_KEY);

        const course = await Course.findById(req.params.courseId).exec();
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

        const section = await Section.findById(req.params.sectionId).exec();
        if (!section) {
            return res.status(404).json({
                message: 'Section not found'
            });
        }

        const updateData = req.body;

        await Section.updateOne({_id: req.params.sectionId}, {$set: updateData}).exec();

        res.status(201).json({
            message: 'Section edited'
        });
    } catch
        (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}

exports.deleteSection = async (req, res, next) => {
    try {
        req.userData = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_KEY);

        const course = await Course.findById(req.params.courseId).exec();
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

        const section = await Section.findById(req.params.sectionId).exec();
        if (!section) {
            return res.status(404).json({
                message: 'Section not found'
            });
        }
        await Course.updateOne({_id: req.params.courseId}, {$pull: {courseSections: req.params.sectionId}}).exec();

        await Section.deleteOne({_id: req.params.sectionId}).exec();

        res.status(201).json({
            message: 'Section deleted'
        });
    } catch
        (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}
exports.addPost = async (req, res, next) => {
    try {
        req.userData = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_KEY);
        const course = await Course.findById(req.params.courseId).exec();

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

        const section = await Section.findById(req.params.sectionId).exec();
        if (!section) {
            return res.status(404).json({
                message: 'Section not found'
            });
        }

        const post = {
            title: req.body.title,
            body: req.body.body,
            attachments: req.body.attachments
        };

        section.posts.push(post);
        await section.save();

        return res.status(201).json({
            message: 'Post added'
        });
    } catch
        (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.editPost = async (req, res, next) => {
    try {
        req.userData = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_KEY);
        const course = await Course.findById(req.params.courseId).exec();

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

        const section = await Section.findById(req.params.sectionId).exec();
        if (!section) {
            return res.status(404).json({
                message: 'Section not found'
            });
        }

        const post = section.posts.id(req.params.postId);

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        await section.posts.id(req.params.postId).set(req.body);
        // Save the updated section
        await section.save();

        res.status(200).json({
            message: 'Post edited',
            updatedPost: post // You can also send the updated post as a response if needed
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        req.userData = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_KEY);
        const course = await Course.findById(req.params.courseId).exec();

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

        const section = await Section.findById(req.params.sectionId).exec();
        if (!section) {
            return res.status(404).json({
                message: 'Section not found'
            });
        }

        const post = section.posts.id(req.params.postId);

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        await section.posts.pull(req.params.postId);

        await section.save();

        res.status(200).json({
            message: 'Post deleted'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}

