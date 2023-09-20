const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");


const Student = require('../models/student');
const Educator = require("../models/educator");
const Token = require("../models/token");
const sendEmail = require("../../utils/sendEmail");


exports.userSignup = async (req, res, next) => {
    try {
        let user = await Student.findOne({email: req.body.email}).exec();

        if (user) {
            return res.status(409).json({
                message: 'Mail is already in use - Student'
            });
        }

        user = await Student.findOne({username: req.body.username}).exec();

        if (user) {
            return res.status(409).json({
                message: 'Username is already in use - Student'
            });
        }

        user = await Student.findOne({phone: req.body.phone}).exec();

        if (user) {
            return res.status(409).json({
                message: 'Phone number is already in use - Student'
            });
        }

        const hash = await bcrypt.hash(req.body.password, 10);

        const newUser = new Student({
            fname: req.body.fname,
            lname: req.body.lname,
            gender: req.body.gender,
            location: req.body.location,
            dob: req.body.dob,
            username: req.body.username,
            password: hash,
            phone: req.body.phone,
            email: req.body.email,
            profilePic: req.body.profilePic,
            interests: req.body.interests,
            bookmarkedCourses: req.body.bookmarkedCourses,
            enrolledCourses: req.body.enrolledCourses
        });

        const result = await newUser.save();

        console.log(result);
        res.status(201).json({
            message: 'Student created'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.userLogin = async (req, res, next) => {
    try {
        const user = await Student.findOne({email: req.body.email}).exec();

        if (!user) {
            return res.status(404).json({
                message: 'User does not exist - Student'
            });
        }

        const result = await bcrypt.compare(req.body.password, user.password);

        if (result) {
            const token = jwt.sign(
                {
                    email: user.email,
                    userId: user._id
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                }
            );
            return res.status(200).json({
                message: 'Logged In Successfully - Student',
                token: token
            });
        } else {
            return res.status(404).json({
                message: 'Wrong Password - Student'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};


exports.userDelete = async (req, res, next) => {
    try {
        const result = await Student.deleteOne({email: req.params.email}).exec();

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.status(200).json({
            message: 'Student deleted'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};


exports.resetPassword = async (req, res, next) => {
    console.log(req.body.email);

    try {
        const user = await Student.findOne({email: req.body.email}).exec();
        if (!user) {
            return res.status(404).json({
                message: 'User not found - Student'
            });
        }

        let token = await Token.findOne({userId: user._id});
        if (!token) {
            token = new Token({
                userId: user._id,
                token: crypto.randomBytes(16).toString('hex')
            });
            await token.save();
        }

        const resetLink = `https://localhost/3000/password-reset/${user._id}/${token.token}`;
        const subject = 'Password Change - Common Ground'

        await sendEmail(user.fname, user.email, subject, resetLink);

        return res.status(200).json({
            message: 'Email sent successfully',
        });
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
};


exports.updatePassword = async (req, res, next) => {
    try {
        const user = await Student.findOne({email: req.body.email}).exec();
        if (!user) {
            return res.status(404).json({
                message: 'User not found - Student'
            });
        }

        const token = await Token.findOne({token: req.body.token}).exec();
        if (!token) {
            return res.status(404).json({
                message: 'Token not found - Student'
            });
        }

        await Token.deleteOne({token: req.body.token}).exec();

        user.password = await bcrypt.hash(req.body.password, 10);

        await user.save();

        res.status(200).json({
            message: 'Password updated successfully'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};
