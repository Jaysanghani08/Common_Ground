const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const fs = require('fs');

const Section = require('../models/section');
const Educator = require('../models/educator');
const Course = require('../models/course');
const {deleteFolder} = require("../../utils/deleteFile");
const path = require("path");


exports.createSection = async (req, res, next) => {
    try {
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

        const section = new Section({
            title: req.body.title,
            posts: []
        });

        await section.save();
        course.courseSections.push(section._id);
        await course.save();

        return res.status(201).json({
            message: 'Section created'
        });
    } catch
        (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
};

exports.editSection = async (req, res, next) => {
    try {
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
        const oldDirectoryName = course.courseCode + '-' + course.courseTitle + '/' + section.title;
        const newDirectoryName = course.courseCode + '-' + course.courseTitle + '/' + req.body.title;

        const courseDirectory = path.join('./uploads/course', oldDirectoryName);
        const newCourseDirectory = path.join('./uploads/course', newDirectoryName);

        if (fs.existsSync(courseDirectory)) {
            fs.renameSync(courseDirectory, newCourseDirectory);
            console.log('Directory already exists and renamed');
        }

        for (let i = 0; i < section.posts.length; i++) {
            for (let j = 0; j < section.posts[i].attachments.length; j++) {
                let filePath = section.posts[i].attachments[j];
                filePath = filePath.replace(section.title, req.body.title);
                section.posts[i].attachments[j] = filePath;
            }
        }

        await section.save();

        const updateData = req.body;

        await Section.updateOne({_id: req.params.sectionId}, {$set: updateData}).exec();

        return res.status(201).json({
            message: 'Section edited'
        });
    } catch
        (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
}

exports.deleteSection = async (req, res, next) => {
    try {
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
        const sectionPath = `uploads/course/${course.courseCode}-${course.courseTitle}/${section.title}`;
        if (fs.existsSync(sectionPath)){
            deleteFolder(sectionPath);
        }

        await Course.updateOne({_id: req.params.courseId}, {$pull: {courseSections: req.params.sectionId}}).exec();

        await Section.deleteOne({_id: req.params.sectionId}).exec();
        return res.status(201).json({
            message: 'Section deleted'
        });
    } catch
        (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
}
exports.addPost = async (req, res, next) => {
    try {
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

        // Get the uploaded files and add their paths to an array
        const attachments = req.files.map(file => file.path);

        const post = {
            title: req.body.title,
            body: req.body.body,
            attachments: attachments
        };

        section.posts.push(post);
        await section.save();

        return res.status(201).json({
            message: 'Post added'
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
};


exports.editPost = async (req, res, next) => {
    try {
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

        // if (req.file)
        // {
        //     const newTitle = req.body.title;
        //     let filePath = post.title;
        //     const lastIndex = filePath.lastIndexOf('\\');
        //     filePath = filePath.slice(0, lastIndex);
        //     filePath = filePath + '\\' + newTitle;
        //     fs.renameSync(post.attachments[0], filePath);
        //     console.log(filePath);
        // }
        await section.posts.id(req.params.postId).set(req.body);

        await section.save();

        return res.status(200).json({
            message: 'Post edited'
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            error: err
        });
    }
}

exports.deletePost = async (req, res, next) => {
    try {
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

        const postPath = `uploads/course/${course.courseCode}-${course.courseTitle}/${section.title}/${post.title}`;
        deleteFolder(postPath);

        await section.posts.pull(req.params.postId);

        await section.save();

        return res.status(200).json({
            message: 'Post deleted'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
}

