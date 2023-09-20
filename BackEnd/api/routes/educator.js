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

// under progress
router.post("/create-course", checkAuth, courseController.createCourse);
router.patch("/edit-course/:courseId", checkAuth, courseController.editCourse);
router.delete("/delete-course/:courseId", checkAuth, courseController.deleteCourse);

module.exports = router;
