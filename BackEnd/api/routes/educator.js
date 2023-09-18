const express = require("express");
const router = express.Router();

const EducatorController = require("../controllers/educator");
const checkAuth = require("../middleware/checkAuth");

router.post("/signup", EducatorController.userSignup);
router.post("/login", EducatorController.userLogin);
router.delete("/:email", checkAuth, EducatorController.userDelete);
router.post('/reset-password', EducatorController.resetPassword);
router.post('/update-password', EducatorController.updatePassword);


module.exports = router;
