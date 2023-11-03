const express = require('express');
const router = express.Router();

const QueryController = require('../controllers/query');

const checkAuth = require('../middleware/checkAuth');
const checkEnroll = require('../middleware/checkEnroll');

router.get('/allcourse', QueryController.getAllCourse);
router.get('/course', QueryController.getCourse);
router.get('/coursebyeducator', checkAuth, QueryController.getCourseByEducator);
// router.get('/searchcourse', QueryController.searchCourse);
router.get('/search-filter', QueryController.searchFilter);


router.get('/dashboard', checkAuth, QueryController.getDashboard);
router.get('/profile', checkAuth, QueryController.getProfile);
router.get('/getCourses', QueryController.getCourses);
router.get('/enrolled-course', checkAuth, QueryController.getEnrolledCourse);
router.get('/getCourse', checkAuth, checkEnroll, QueryController.getCourse);

module.exports = router;