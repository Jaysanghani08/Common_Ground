const multerProfile = require("multer");
const path = require("path");
const fs = require("fs");
const Course = require('../models/course');
const Section = require('../models/section');

const storage = multerProfile.diskStorage({
    destination: async function (req, file, cb) {
        const courseId = req.params.courseId;
        try {
            if (!courseId) {
                throw new Error('Course ID is missing');
            }

            const course = await Course.findById(courseId);
            if (!course) {
                throw new Error('Course not found in the database');
            }
            const assignmentDirectory = path.join(`./uploads/course/${course.courseCode}-${course.courseTitle}/assignments`);
            if (!fs.existsSync(assignmentDirectory)) {
                fs.mkdirSync(assignmentDirectory, { recursive: true });
            }

            const assignmentTitle = req.body.title;
            const newAssignmentDirectory = path.join(assignmentDirectory, assignmentTitle);
            if (!fs.existsSync(newAssignmentDirectory)) {
                fs.mkdirSync(newAssignmentDirectory, { recursive: true });
                console.log('Assignment directory created');
            }
            cb(null, newAssignmentDirectory);

        } catch (err) {
            console.error('Error:', err.message);
            cb(err.message, null);
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const assignment = multerProfile({ storage: storage });

module.exports = { assignment };
