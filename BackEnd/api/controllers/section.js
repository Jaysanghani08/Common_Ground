const mongoose = require('mongoose');
const Section = require('../models/section');
const Educator = require('../models/educator');
const jwt = require("jsonwebtoken");

exports.createSection = async (req,res,next) => {
    try {
        req.userData = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_KEY);

        const newSection = new Section ( {
            title: req.body.title,
            description: req.body.description,
            attachments: req.body.attachments,
        });
        await newSection.save();
        res.status(201).json({
            message: 'Section created'
        });
    }
    catch
        (err) {
        console.log(err);
        res.status(500).json({
            message : 'error while creating',
            error: err
        });
    }
};

