const express = require("express");
const router = express.Router();

const StudentController = require("../controllers/student");
const CourseController = require("../controllers/course");

const checkAuth = require("../middleware/checkAuth");

router.post("/signup", StudentController.userSignup);
router.post("/login", StudentController.userLogin);
router.post('/reset-password', StudentController.resetPassword);
router.post('/update-password', StudentController.updatePassword);
router.delete("/:email", checkAuth, StudentController.userDelete);

router.post("/enroll/:courseId", checkAuth, CourseController.enrollCourse);
router.post("/unenroll/:courseId", checkAuth, CourseController.unenrollCourse);

module.exports = router;
