const multerProfile = require("multer");
const path = require("path");
const fs = require("fs/promises"); // Import fs.promises for promise-based file operations

const Course = require('../models/course');

const storage = multerProfile.diskStorage({
    destination: async function (req, file, cb) {
        try {
            const course = await Course.findById(req.params.courseId).exec();
            if (!course) {
                throw new Error('Course not found');
            }

            destinationPath = path.join(
                './uploads/course',
                `${course.courseCode}-${course.courseTitle}`,
                req.body.sectionTitle
            );

            await fs.mkdir(destinationPath, { recursive: true });
        } catch (err) {
            console.error(err);
            return cb(err);
        }

        cb(null, destinationPath);
    }
});

const section = multerProfile({ storage: storage });

module.exports = { section };
