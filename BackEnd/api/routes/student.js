const express = require("express");
const router = express.Router();
const { profilePhoto } = require("../middleware/multerProfile");
const { submission } = require("../middleware/multerSubmission");

const StudentController = require("../controllers/student");
const CourseController = require("../controllers/course");
const DiscussionController = require("../controllers/discussion");
const SubmissionController = require("../controllers/submission");

const checkAuth = require("../middleware/checkAuth");
const checkEnroll = require("../middleware/checkEnroll");

// multer middleware
const profileUpload = profilePhoto.single('profilePic');
const submissionUpload = submission.array('submission');

router.post("/signup", profileUpload, StudentController.userSignup);
router.post("/login", StudentController.userLogin);
router.post('/reset-password', StudentController.resetPassword);
router.post('/update-password', StudentController.updatePassword);
router.patch("/edit-profile", checkAuth, profileUpload, StudentController.userEdit);
router.delete("/:email", checkAuth, StudentController.userDelete);

router.post("/enroll/:courseId", checkAuth, CourseController.enrollCourse);
router.post("/unenroll/:courseId", checkAuth, CourseController.unenrollCourse);
router.post("/rating/:courseId", checkAuth, checkEnroll, CourseController.rateCourse);

router.post("/:courseId/discussion", checkAuth, checkEnroll, DiscussionController.addMessage);
router.patch("/:courseId/discussion/:messageId", checkAuth, checkEnroll, DiscussionController.editMessage);
router.delete("/:courseId/discussion/:messageId", checkAuth, checkEnroll, DiscussionController.deleteMessage);
router.get("/:courseId/certificate", checkAuth, checkEnroll, CourseController.getCertificate);

router.post("/submit-assignment/:assignmentId", submissionUpload, checkAuth, SubmissionController.submitSubmission);
router.delete("/delete-submission/:submissionId", checkAuth, SubmissionController.deleteSubmission);

module.exports = router;
