const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const Student = require('../models/student');
const Educator = require('../models/educator');
const Course = require('../models/course');
const Section = require('../models/section');

exports.streamFile = async (req, res, next) => {
    try {
        const range = req.headers.range;
        if (!range) {
            return res.status(400).send("Requires Range header");
        }

        const course = await Course.findById(req.params.courseId).exec();
        if (!course) {
            return res.status(404).json({
                message: 'Course not found'
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

        const fileName = req.params.fileName;
        const filePath = post.attachments[0];

        const lastIndex = filePath.lastIndexOf('\\');
        const pathWithoutFileName = filePath.slice(0, lastIndex);

        const path = pathWithoutFileName + '\\' + fileName;

        fs.stat(path, function(err, stats) {
            if (err) {
                return res.status(404).json({
                    message: 'File not found'
                });
            }
        });

        const videoSize = fs.statSync(path).size;
        console.log(videoSize);

        const CHUNK_SIZE = 10 ** 6;
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

        const contentLength = end - start + 1;

        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };

        res.writeHead(206, headers);

        const videoStream = fs.createReadStream(path, { start, end });
        videoStream.pipe(res);

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
}

exports.testStream = async (req, res, next) => {
    try {
        const courseId = req.query.courseId;
        if (!courseId) {
            return res.status(400).json({
                message: 'Course ID not found'
            });
        }

        const course = await Course.findById(courseId).exec();
        if (!course) {
            return res.status(404).json({
                message: 'Course not found'
            });
        }

        if (req.userData.userType === 'student') {
            if (!course.enrolledStudents.includes(req.userData.userId)) {
                return res.status(401).json({
                    message: 'You are not enrolled in this course'
                });
            }
        }
        else {
            if (!course.createdBy.equals(req.userData.userId)) {
                return res.status(401).json({
                    message: 'You are not the creator of this course'
                });
            }
        }

        const videoPath = req.query.path;

        const courseString = course.courseCode + '-' + course.courseTitle;

        if (!videoPath.includes(courseString)) {
            return res.status(401).json({
                message: 'You are not enrolled in this course'
            });
        }
        if (!videoPath) {
            return res.status(400).json({
                message: 'Path not found'
            });
        }

        if (!fs.existsSync(videoPath)) {
            return res.status(404).json({
                message: 'File not found'
            });
        }

        const fileSize = fs.statSync(videoPath).size;
        const range = req.headers.range;

        if (range) {
            const CHUNK_SIZE = 10 ** 6;
            const start = Number(range.replace(/\D/g, ""));
            const end = Math.min(start + CHUNK_SIZE, fileSize - 1);

            const contentLength = end - start + 1;

            const headers = {
                "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": contentLength,
                "Content-Type": getContentType(videoPath),
            };

            res.writeHead(206, headers);

            const videoStream = fs.createReadStream(videoPath, { start, end });
            videoStream.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': getContentType(videoPath),
            };
            res.writeHead(200, head);
            fs.createReadStream(videoPath).pipe(res);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: err.message
        });
    }
};

function getContentType(filePath) {
    const extname = path.extname(filePath);
    switch (extname) {
        case '.mp4':
            return 'video/mp4';
        case '.pdf':
            return 'application/pdf';
        default:
            return 'application/octet-stream';
    }
}