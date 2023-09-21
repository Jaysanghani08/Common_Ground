const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: 'CommonGround <admin@test.com>',
            cc: "202101224@daiict.ac.in",
            to: email,
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
