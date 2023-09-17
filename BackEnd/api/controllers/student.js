const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Student = require('../models/student');

exports.userSignup = (req, res, next) => {
    Student.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Mail exists - Student'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new Student({
                            fname: req.body.fname,
                            lname: req.body.lname,
                            gender: req.body.gender,
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
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'Student created'
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
};

exports.userLogin = (req, res, next) => {
    Student.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    message: 'Auth failed - Student'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(404).json({
                            message: 'Auth failed - Student'
                        });
                    }
                    if (result) {
                        const token = jwt.sign({
                                email: user[0].email,
                                userId: user[0]._id
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "1h"
                            }
                        );
                        return res.status(200).json({
                            message: 'Auth successful - Student',
                            token: token
                        });
                    }
                }
            );
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.userDelete = (req, res, next) => {
    Student.deleteOne({email: req.params.email})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Student deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};