const nodemailer = require("nodemailer");

const sendEmail = async (fname, email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'sheldon.price@ethereal.email',
                pass: 'Vrj8nXyErz2AX2HyFW'
            }
        });

        const body = `Dear ${fname},\n\nWe received a request to reset your password. To reset your password, please click on the following link:\n\n${text}\n\nIf you did not request this password reset, please ignore this email. Your account security is important to us.\n\nSincerely,\nCommon Ground`

        const mailOptions = {
            from: 'Jay <jay@test.com>',
            to: email,
            subject: subject,
            text: body
        };

        await transporter.sendMail(mailOptions);

        console.log("Email sent successfully");
    } catch (error) {
        console.error("Email not sent:", error);
    }
};

module.exports = sendEmail;
