const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Course = require('../models/course');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        req.userData = jwt.verify(token, process.env.JWT_KEY);

        const course = await Course.findById(req.params.courseId).exec(); // Use await here
        if (!course) {
            return res.status(404).json({
                message: 'Course not found'
            });
        }

        if (!course.enrolledStudents.includes(req.userData.userId)) {
            return res.status(401).json({
                message: 'You are not enrolled in this course'
            });
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
};
