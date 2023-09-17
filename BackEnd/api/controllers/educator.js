const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Educator = require('../models/educator');
const Student = require("../models/student");

exports.userSignup = (req, res, next) => {
    Educator.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Mail exists - Educator'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new Educator({
                            fname: req.body.fname,
                            lname: req.body.lname,
                            gender: req.body.gender,
                            dob: req.body.dob,
                            username: req.body.username,
                            password: hash,
                            phone: req.body.phone,
                            email: req.body.email,
                            upiID: req.body.upiID,
                            bio: req.body.bio,
                            profilePic: req.body.profilePic,
                            courseCreated: req.body.courseCreated,
                        });
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'Educator created'
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
    Educator.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    message: 'Auth failed - Educator'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(404).json({
                            message: 'Auth failed - Educator'
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
                            message: 'Auth successful - Educator',
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
    Educator.deleteOne({email: req.params.email})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Educator deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};