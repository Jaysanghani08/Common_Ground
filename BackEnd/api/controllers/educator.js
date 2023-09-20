const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const Educator = require('../models/educator');
const Student = require("../models/student");
const Token = require("../models/token");
const sendEmail = require("../../utils/sendEmail");

exports.userSignup = async (req, res, next) => {
    try {
        let user = await Educator.findOne({email: req.body.email}).exec();

        if (user) {
            return res.status(409).json({
                message: 'Mail is already in use - Educator'
            });
        }

        user = await Educator.findOne({username: req.body.username}).exec();

        if (user) {
            return res.status(409).json({
                message: 'Username is already in use - Educator'
            });
        }

        user = await Educator.findOne({phone: req.body.phone}).exec();

        if (user) {
            return res.status(409).json({
                message: 'Phone number is already in use - Educator'
            });
        }

        const hash = await bcrypt.hash(req.body.password, 10);

        const newUser = new Educator({
            fname: req.body.fname,
            lname: req.body.lname,
            gender: req.body.gender,
            dob: req.body.dob,
            location: req.body.location,
            username: req.body.username,
            password: hash,
            phone: req.body.phone,
            email: req.body.email,
            upiID: req.body.upiID,
            bio: req.body.bio,
            profilePic: req.body.profilePic,
            courseCreated: req.body.courseCreated,
        });

        const result = await newUser.save();

        console.log(result);
        res.status(201).json({
            message: 'Educator created'
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
        const user = await Educator.findOne({ email: req.body.email }).exec();

        if (!user) {
            return res.status(404).json({
                message: 'User does not exist - Educator'
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
                message: 'Logged In Successfully - Educator',
                token: token
            });
        } else {
            return res.status(404).json({
                message: 'Wrong Password - Educator'
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
        const result = await Educator.deleteOne({ email: req.params.email }).exec();

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: 'Educator not found'
            });
        }

        res.status(200).json({
            message: 'Educator deleted'
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
        const user = await Educator.findOne({email: req.body.email}).exec();

        if (!user) {
            return res.status(404).json({
                message: 'User not found - Educator'
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

        const link = `www.google.com/password-reset/${user._id}/${token.token}`;
        await sendEmail(user.email, "Password reset", link);

        res.send("password reset link sent to your email account");
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
};


exports.updatePassword = async (req, res, next) => {
    try {
        console.log(req.body);

        const user = await Educator.findOne({ email: req.body.email }).exec();
        if (!user) {
            return res.status(404).json({
                message: 'User not found - Educator'
            });
        }


        const token = await Token.findOne({ token: req.body.token }).exec();
        if (!token) {
            return res.status(404).json({
                message: 'Token not found - Educator'
            });
        }

        await Token.deleteOne({ token: req.body.token }).exec();

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
