const express = require("express");
const router = express.Router();

const EducatorController = require("../controllers/educator");
const CourseController = require("../controllers/course");
const SectionController = require("../controllers/section");
const AssignmentController = require("../controllers/assignment");
const DiscussionController = require("../controllers/discussion");

const checkAuth = require("../middleware/checkAuth");
const checkEnroll = require("../middleware/checkEnroll");

// multer middleware
const { profilePhoto } = require("../middleware/multerProfile");
const { course } = require("../middleware/multerCourse");
const { section } = require("../middleware/multerSection");
const { assignment } = require("../middleware/multerAssignment");
const profileUpload = profilePhoto.single('profilePic');
const courseUpload = course.single('thumbnail');
const sectionUpload = section.array('attachments', 10);
const assignmentUpload = assignment.array('attachments', 10);

router.post("/signup", profileUpload, EducatorController.userSignup);
router.post("/login", EducatorController.userLogin);
router.post('/reset-password', EducatorController.resetPassword);
router.post('/update-password', EducatorController.updatePassword);
router.patch("/edit-profile", checkAuth, profileUpload, EducatorController.userEdit);
router.delete("/:email", checkAuth, EducatorController.userDelete);

router.post("/create-course", checkAuth, courseUpload, CourseController.createCourse);
router.patch("/edit-course/:courseId", checkAuth, courseUpload, CourseController.editCourse);
router.post("/delete-course/:courseId", checkAuth, CourseController.deleteCourse);
router.delete("/delete-course/:courseId/:token", checkAuth, CourseController.sudoDeleteLecture);
router.post("/remove-student/:courseId/:studentId", checkAuth, CourseController.removeStudent);

router.post("/create-section/:courseId", checkAuth, SectionController.createSection);
router.patch("/edit-section/:courseId/:sectionId", checkAuth, SectionController.editSection);
router.delete("/delete-section/:courseId/:sectionId", checkAuth, SectionController.deleteSection);

router.post("/add-post/:courseId/:sectionId", checkAuth, sectionUpload, SectionController.addPost);
router.patch("/edit-post/:courseId/:sectionId/:postId", checkAuth, sectionUpload, SectionController.editPost);
router.delete("/delete-post/:courseId/:sectionId/:postId", checkAuth, SectionController.deletePost);

router.post("/:courseId/discussion", checkAuth, checkEnroll, DiscussionController.addMessage);
router.patch("/:courseId/discussion/:messageId", checkAuth, checkEnroll, DiscussionController.editMessage);
router.delete("/:courseId/discussion/:messageId", checkAuth, checkEnroll, DiscussionController.deleteMessage);

router.post("/create-assignment/:courseId", checkAuth, assignmentUpload, AssignmentController.createAssignment);
// router.patch("/edit-assignment/:courseId/:assignmentId", assignmentUpload, checkAuth, AssignmentController.editAssignment);
router.delete("/delete-assignment/:courseId/:assignmentId", checkAuth, AssignmentController.deleteAssignment);
router.post("/grade-assignment/:courseId/:assignmentId/:submissionId", checkAuth, AssignmentController.gradeAssignment);

module.exports = router;
