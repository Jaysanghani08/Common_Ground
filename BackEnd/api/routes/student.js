const express = require("express");
const router = express.Router();
const { profilePhoto } = require("../middleware/multerProfile");

const StudentController = require("../controllers/student");
const CourseController = require("../controllers/course");
const DiscussionController = require("../controllers/discussion");

const checkAuth = require("../middleware/checkAuth");
const checkEnroll = require("../middleware/checkEnroll");

router.post("/signup", profilePhoto.single('profilePic'), StudentController.userSignup);
router.post("/login", StudentController.userLogin);
router.post('/reset-password', StudentController.resetPassword);
router.post('/update-password', StudentController.updatePassword);
router.delete("/:email", checkAuth, StudentController.userDelete);

router.post("/enroll/:courseId", checkAuth, CourseController.enrollCourse);
router.post("/unenroll/:courseId", checkAuth, CourseController.unenrollCourse);

router.post("/:courseId/discussion", checkAuth, checkEnroll, DiscussionController.addMessage);
router.patch("/:courseId/discussion/:messageId", checkAuth, checkEnroll, DiscussionController.editMessage);
router.delete("/:courseId/discussion/:messageId", checkAuth, checkEnroll, DiscussionController.deleteMessage);


module.exports = router;
