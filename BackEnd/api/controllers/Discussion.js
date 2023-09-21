// discussion forum controller
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Discussion = require('../models/discussion');
const Student = require('../models/student');
const Educator = require('../models/educator');
exports.createDiscussion = async (req, res, next) => {
    try {
        const newDiscussion = new Discussion({
            messages: []
        });
        await newDiscussion.save();
        res.status(201).json({
            message: 'Discussion created'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};
exports.addMessage = async (req, res, next) => {
    try {
        const discussionId = req.params.discussionId;
        const discussion = await Discussion.findById(discussionId).exec();
        if (!discussion) {
            return res.status(404).json({
                message: 'Discussion not found'
            });
        }
        const message = {
            message: req.body.message,
            createdByStudent: req.body.createdByStudent,
            createdByEducator: req.body.createdByEducator
        };
        discussion.messages.push(message);
        await discussion.save();
        res.status(201).json({
            message: 'Message added to discussion'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

