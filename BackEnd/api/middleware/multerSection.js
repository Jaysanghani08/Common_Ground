const multerProfile = require("multer");
const path = require("path");
const fs = require("fs");
const Course = require('../models/course');
const Section = require('../models/section');

const storage = multerProfile.diskStorage({
    destination: async function (req, file, cb) {
        const courseId = req.params.courseId;
        const sectionId = req.params.sectionId;

        try {
            if (!courseId) {
                throw new Error('Course ID is missing');
            }

            const course = await Course.findById(courseId);
            if (!course) {
                throw new Error('Course not found in the database');
            }

            if (sectionId) {
                const section = await Section.findById(sectionId);
                if (section) {
                    const sectionTitle = section.title;

                    const sectionDirectory = path.join(
                        `./uploads/course/${course.courseCode}-${course.courseTitle}`,
                        sectionTitle
                    );

                    if (!fs.existsSync(sectionDirectory)) {
                        fs.mkdirSync(sectionDirectory, { recursive: true });
                    }

                    const postTitle = req.body.title;
                    const postDirectory = path.join(sectionDirectory, postTitle);

                    if (!fs.existsSync(postDirectory)) {
                        fs.mkdirSync(postDirectory, { recursive: true });
                    }

                    console.log('Post directory created');
                    cb(null, postDirectory);
                } else {
                    console.error('Section not found in the database');
                    cb('Section not found in the database', null);
                }
            } else {
                console.error('Section ID is missing');
                cb('Section ID is missing', null);
            }
        } catch (err) {
            console.error('Error:', err.message);
            cb(err.message, null);
        }
    },
    filename: function (req, file, cb) {
        cb(null, req.body.courseTitle + Date.now() + file.originalname);
    }
});

const section = multerProfile({ storage: storage });

module.exports = { section };
