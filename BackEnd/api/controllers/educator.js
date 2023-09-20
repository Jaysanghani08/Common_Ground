const mongoose = require('mongoose');

exports.userLogin = async (req, res, next) => {
    try {
        const user = await Educator.findOne({ email: req.body.email }).exec();

        if (!user || user.length < 1) {
            return res.status(404).json({
                message: 'Auth failed - Educator'
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
                message: 'Auth successful - Educator',
                token: token
            });
        } else {
            return res.status(404).json({
                message: 'Auth failed - Educator'
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
        console.log(user);
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

        console.log(token);
        return res.status(200).json({
            message: 'Reset password link sent to email - Educator',
            token: token
        });
    } catch (error) {
        // Handle any potential errors here
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }
};


exports.updatePassword = async (req, res, next) => {
    try {
        console.log(req.body);

        // Find the user
        const user = await Educator.findOne({ email: req.body.email }).exec();
        if (!user) {
            return res.status(404).json({
                message: 'User not found - Educator'
            });
        }

        // Find the token
        const token = await Token.findOne({ token: req.body.token }).exec();
        if (!token) {
            return res.status(404).json({
                message: 'Token not found - Educator'
            });
        }

        // Delete the token
        const deleteTokenResult = await Token.deleteOne({ token: req.body.token }).exec();
        console.log(deleteTokenResult);

        // Update the user's password
        user.password = await bcrypt.hash(req.body.password, 10);
        await user.save();

        // Respond with success
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
