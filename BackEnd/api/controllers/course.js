const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const Course = require('../models/course');

exports.createCourse = async (req, res, next) => {
    try {
        req.userData = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_KEY);

        const newCourse = new Course({
            courseTitle: req.body.courseTitle,
            courseDescription: req.body.courseDescription,
            courseDescriptionLong: req.body.courseDescriptionLong,
            coursePrice: req.body.coursePrice,
            thumbnail: req.body.thumbnail,
            tags: req.body.tags,
            courseLevel: req.body.courseLevel,
            courseCode: req.body.courseCode,
            language: req.body.language,
            prerequisites: req.body.prerequisites,
            createdBy: req.userData.userId
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

        const updateData = req.body;

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
        
        await Course.deleteOne({_id: courseId}).exec();

        res.status(200).json({
            message: 'Course deleted'
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}