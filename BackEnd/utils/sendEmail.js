const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587,
            auth: {
                user: "3sy9lit63@mozmail.com",
                pass: "zNLTaqQK78FxPtym"
            }
        });

        const mailOptions = {
            from: 'CommonGround <admin@test.com>',
            to: "202101224@daiict.ac.in",
            subject: subject,
            html: body
        };

        await transporter.sendMail(mailOptions);

        console.log("Email sent successfully");
    } catch (error) {
        console.error("Email not sent:", error);
    }
};

module.exports = sendEmail;
