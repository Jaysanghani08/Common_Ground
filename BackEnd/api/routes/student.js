const express = require("express");
const router = express.Router();

const StudentController = require("../controllers/student");
const checkAuth = require("../middleware/checkAuth");

router.post("/signup", StudentController.userSignup);
router.post("/login", StudentController.userLogin);
router.post('/reset-password', StudentController.resetPassword);
router.post('/update-password', StudentController.updatePassword);
router.delete("/:email", checkAuth, StudentController.userDelete);


module.exports = router;
