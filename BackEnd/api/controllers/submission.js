const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const Course = require('../models/course');
const Educator = require("../models/educator");
const Student = require("../models/student");
const Assignment = require('../models/assignment');
const Submission = require('../models/submission');

const sendEmail = require("../../utils/sendEmail");
const {deleteFile, deleteFolder} = require("../../utils/deleteFile");


exports.submitSubmission = async (req, res, next) => {
    try {
        const assignment = await Assignment.findById(req.params.assignmentId);
        if (!assignment) {
            return res.status(404).json({
                message: "Assignment not found"
            });
        }

        if (assignment.dueDate < Date.now()) {
            return res.status(401).json({
                message: "Assignment submission time is over"
            });
        }

        const course = await Course.findById(assignment.course);
        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        if (!course.enrolledStudents.includes(req.userData.userId)) {
            return res.status(401).json({
                message: "You are not enrolled in this course"
            });
        }

        const submission = new Submission({
            assignment: assignment._id,
            submittedBy: req.userData.userId,
            submission: req.files.map(file => file.path),
        });

        await submission.save();

        await assignment.submission.push(submission._id);
        await assignment.save();

        return res.status(201).json({
            message: "Submission successful"
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: err.message
        });
    }
}

exports.deleteSubmission = async (req, res, next) => {
    try {
        const submission = await Submission.findById(req.params.submissionId);
        if (!submission) {
            return res.status(404).json({
                message: "Submission not found"
            });
        }

        const assignment = await Assignment.findById(submission.assignment);
        if (!assignment) {
            return res.status(404).json({
                message: "Assignment not found"
            });
        }

        const course = await Course.findById(assignment.course);
        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        if (!course.enrolledStudents.includes(req.userData.userId)) {
            return res.status(401).json({
                message: "You are not enrolled in this course"
            });
        }

        if (submission.submittedBy.toString() !== req.userData.userId) {
            return res.status(401).json({
                message: "You are not authorized to delete this submission"
            });
        }

        await deleteFile(submission.submission.toString());

        await assignment.submission.pull(submission._id);
        await assignment.save();

        await Submission.deleteOne({ _id: req.params.submissionId });

        return res.status(200).json({
            message: "Submission deleted successfully"
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: err.message
        });
    }
}