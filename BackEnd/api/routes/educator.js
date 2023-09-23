const express = require("express");
const router = express.Router();
const { profilePhoto } = require("../middleware/multerProfile");
const { course } = require("../middleware/multerCourse");
const { section } = require("../middleware/multerSection");

const EducatorController = require("../controllers/educator");
const CourseController = require("../controllers/course");
const SectionController = require("../controllers/section");

const checkAuth = require("../middleware/checkAuth");

// multer middleware
const profileUpload = profilePhoto.single('profilePic');
const courseUpload = course.single('thumbnail');
const sectionUpload = section.array('attachments', 10);

router.post("/signup", profileUpload, EducatorController.userSignup);
router.post("/login", EducatorController.userLogin);
router.post('/reset-password', EducatorController.resetPassword);
router.post('/update-password', EducatorController.updatePassword);
router.delete("/:email", checkAuth, EducatorController.userDelete);

router.post("/create-course", courseUpload, checkAuth, CourseController.createCourse);
router.patch("/edit-course/:courseId", courseUpload, checkAuth, CourseController.editCourse);
router.post("/delete-course/:courseId", checkAuth, CourseController.deleteCourse);
router.delete("/delete-course/:courseId/:token", checkAuth, CourseController.sudoDeleteLecture);

router.post("/create-section/:courseId", checkAuth, SectionController.createSection);
router.patch("/edit-section/:courseId/:sectionId", checkAuth, SectionController.editSection);
router.delete("/delete-section/:courseId/:sectionId", checkAuth, SectionController.deleteSection);

router.post("/add-post/:courseId/:sectionId", sectionUpload, checkAuth, SectionController.addPost);
router.patch("/edit-post/:courseId/:sectionId/:postId", sectionUpload, checkAuth, SectionController.editPost);
router.delete("/delete-post/:courseId/:sectionId/:postId", checkAuth, SectionController.deletePost);

module.exports = router;
