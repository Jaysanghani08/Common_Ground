const multerProfile = require("multer");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const Course = require('../models/course');
const Section = require('../models/section');
const Assignment = require('../models/assignment');
const {assignment} = require("./multerAssignment");

const storage = multerProfile.diskStorage({
    destination: async function (req, file, cb) {
        try {
            if (!req.params.assignmentId) {
                return cb('Assignment ID is missing', null);
            }

            const assignment = await Assignment.findById(req.params.assignmentId);
            if (!assignment) {
                return cb('Assignment not found', null);
            }

            const course = await Course.findById(assignment.course);
            if (!course) {
                return cb('Course not found', null);
            }

            const assignmentDirectory = path.join(`./uploads/course/${course.courseCode}-${course.courseTitle}/assignments/${assignment.title}/submissions`);
            if (!fs.existsSync(assignmentDirectory)) {
                fs.mkdirSync(assignmentDirectory, { recursive: true });
            }
            cb(null, assignmentDirectory);

        } catch (err) {
            console.error('Error:', err.message);
            cb(err.message, null);
        }
    },
    filename: function (req, file, cb) {
        req.userData = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_KEY);
        cb(null,  path.basename(file.originalname) + req.params.assignmentId + '-' +req.userData.userId + path.extname(file.originalname));
    }
});

const submission = multerProfile({ storage: storage });

module.exports = { submission };
