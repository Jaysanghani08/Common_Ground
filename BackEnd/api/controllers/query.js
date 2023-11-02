const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const Course = require('../models/course');

exports.getAllCourse = async (req, res, next) => {
    try {
        const courses = await Course.find();
        res.status(200).json({
            courses: courses
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}

exports.getCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.query.courseId).exec();

        if (!course) {
            return res.status(404).json({
                message: 'Course not found'
            });
        }

        return res.status(200).json({
            course: course
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}

exports.getCourseByEducator = async (req, res, next) => {
    try {
        const courses = await Course.find({createdBy: req.query.educatorId}).exec();

        if (!courses) {
            return res.status(404).json({
                message: 'This educator has no courses'
            });
        }
        console.log(courses);
        return res.status(200).json({
            courses: courses
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
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
        res.status(500).json({
            error: err
        });
    }
};

exports.searchFilter = async (req, res, next) => {
    try {
        let filters = {};
        if (req.query.title) {
            filters.courseTitle = { $regex: new RegExp(req.query.title, 'i') };
        }
        if (req.query.price)
        {
            filters.price = {$lte: req.query.price};
        }
        if (req.query.tag)
        {
            let tags = [];
            tags = req.query.tag.split(',');
            filters.tags = {$in: tags};
        }
        if (req.query.level) {
            filters.courseLevel = req.query.level;
        }
        if (req.query.language) {
            filters.language = req.query.language;
        }
        if (req.query.prerequisites)
        {
            let prerequisites = [];
            prerequisites = req.query.prerequisites.split(',');
            filters.prerequisites = prerequisites;
        }
        if (req.query.rating) {
            filters.rating = {$gte: req.query.rating};
        }

        filters.visibility = "public";
        console.log(filters);
        const courses = await Course.find(filters).select('_id courseTitle courseDescription coursePrice courseLevel courseCode language prerequisites').exec();
        return res.status(200).json({
            courses: courses
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}

exports.getDashboard = async (req, res, next) => {
    try {
        console.log(req.userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}