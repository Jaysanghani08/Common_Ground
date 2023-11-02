const express = require('express');
const router = express.Router();

const QueryController = require('../controllers/query');

const checkAuth = require('../middleware/checkAuth');

router.get('/allcourse', QueryController.getAllCourse);
router.get('/course', QueryController.getCourse);
router.get('/coursebyeducator', QueryController.getCourseByEducator);
router.get('/enrolledcourse', QueryController.getEnrolledCourse);
// router.get('/searchcourse', QueryController.searchCourse);
router.get('/search-filter', QueryController.searchFilter);


router.get('/dashboard', checkAuth, QueryController.getDashboard);
module.exports = router;