const express = require("express");
const router = express.Router();

const EducatorController = require("../controllers/educator");
const courseController = require("../controllers/course");

const checkAuth = require("../middleware/checkAuth");

router.post("/signup", EducatorController.userSignup);
router.post("/login", EducatorController.userLogin);
router.post('/reset-password', EducatorController.resetPassword);
router.post('/update-password', EducatorController.updatePassword);
router.delete("/:email", checkAuth, EducatorController.userDelete);

router.post("/create-course", checkAuth, courseController.createCourse);
router.patch("/edit-course/:courseId", checkAuth, courseController.editCourse);
router.post("/delete-course/:courseId", checkAuth, courseController.deleteCourse);
router.post("/delete-course/:courseId/:token", checkAuth, courseController.sudoDeleteLecture);

module.exports = router;
