const express = require("express");
const router = express.Router();

const FileController = require("../controllers/fileStream");

const checkAuth = require("../middleware/checkAuth");
const checkEnroll = require("../middleware/checkEnroll");

router.get("/video/:courseId/:sectionId/:postId/:fileName", FileController.streamFile);
router.get("/retrieve", checkAuth, FileController.testStream);

module.exports = router;
