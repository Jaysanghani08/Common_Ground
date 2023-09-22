const multerProfile = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multerProfile.diskStorage({
    destination: function (req, file, cb) {
        fs.mkdir('./uploads/course/' + req.body.courseCode + '-' + req.body.courseTitle, {recursive: true}, (err) => {
            if (err) {
                return console.error(err);
            }
            cb(null, './uploads/course/' + req.body.courseCode + '-' + req.body.courseTitle);
        });
    },
    filename: function (req, file, cb) {
        cb(null, req.body.courseTitle + Date.now() + file.originalname);
    }
});

const course = multerProfile({storage: storage});

module.exports = {course};
