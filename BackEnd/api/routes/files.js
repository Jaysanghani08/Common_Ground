const express = require("express");
const router = express.Router();

const FileController = require("../controllers/fileStream");

router.get("/video/:courseId/:sectionId/:postId/:fileName", FileController.streamFile);
router.get("/retrieve", FileController.testStream);
router.get("/verify/:certificateId", FileController.verifyCertificate);

module.exports = router;
