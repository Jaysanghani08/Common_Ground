const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");


const Student = require('../models/student');
const Educator = require("../models/educator");
const Token = require("../models/token");
const sendEmail = require("../../utils/sendEmail");
const deleteFile = require("../../utils/deleteFile");

exports.userSignup = async (req, res, next) => {
    try {
        let user = await Student.findOne({email: req.body.email}).exec();

        if (user) {
            if (req.file)
                deleteFile.deleteFile(req.file.path);
            return res.status(409).json({
                message: 'Mail is already in use - Student'
            });
        }

        user = await Student.findOne({username: req.body.username}).exec();

        if (user) {
            if (req.file)
                deleteFile.deleteFile(req.file.path);
            return res.status(409).json({
                message: 'Username is already in use - Student'
            });
        }

        user = await Student.findOne({phone: req.body.phone}).exec();

        if (user) {
            if (req.file)
                deleteFile.deleteFile(req.file.path);
            return res.status(409).json({
                message: 'Phone number is already in use - Student'
            });
        }

        const hash = await bcrypt.hash(req.body.password, 10);

        let profilePic = null;
        if (req.file) {
            profilePic = req.file.path;
        }
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
            profilePic: profilePic,
            interests: req.body.interests,
            bookmarkedCourses: req.body.bookmarkedCourses,
            enrolledCourses: req.body.enrolledCourses
        });

        const result = await newUser.save();

        res.status(201).json({
            message: 'Student created'
        });
    } catch (err) {
        console.log(err);
        if (req.file)
            deleteFile.deleteFile(req.file.path);

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
        const profilePic = await Student.findOne({email: req.params.email}).select('profilePic').exec();
        const result = await Student.deleteOne({email: req.params.email}).exec();

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }
        if (profilePic)
            deleteFile.deleteFile(profilePic);

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

        const resetLink = `http://localhost:3000/student/resetpassword/${user._id}/${token.token}`;
        const subject = 'Password Change - Common Ground'
        const body = `
            <html>
              <head>
                <style>
                  /* Define your CSS styles here */
                  body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                  }
                  .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 5px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                  }
                  a {
                    color: #007bff;
                    text-decoration: none;
                  }
                  img {
                    max-width: 100%; /* Ensure the image fits within its parent container */
                    height: auto; /* Maintain the aspect ratio */
                    display: block; /* Remove any extra spacing around the image */
                    margin: 0 auto; /* Center the image horizontally */
                  }
                  .reset-button {
                      display: block;
                      padding: 10px 20px;
                      background-color: #007bff;
                      color: #fff;
                      text-decoration: none;
                      border-radius: 5px;
                      font-size: 18px;
                      text-align: center;
                  }
                   .reset-button:hover {
                      background-color: #0056b3;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <img src="https://user-images.githubusercontent.com/94957904/268924860-0c79050a-ab46-47ab-856c-f26909c185df.jpg" alt="Common Ground" />
                  <p>Hello ${user.username},</p>
                  <p>You have requested to reset your password. Please click on the following link to reset your password:</p>
                  <a class="reset-button" href="${resetLink}">Reset Password</a>
                  <p>If you didn't request this, you can safely ignore this email.</p>
                  <p>Best regards,<br />The Common Ground Team</p>
                </div>
              </body>
            </html>
            `;

        await sendEmail(user.email, subject, body);

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
