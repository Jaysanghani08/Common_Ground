const mongoose = require('mongoose');
const app = require('../app');
const Student = require('../api/models/student');
const Educator = require('../api/models/educator');
const Course = require('../api/models/course');
const request = require('supertest');
const path = require("path");
const fs = require("fs");
const expect = require('chai').expect;

beforeAll(async () => {
    const testDbUrl = 'mongodb+srv://Group16:Group16@cluster0.vfhbrkw.mongodb.net/Test_Common_Ground?retryWrites=true&w=majority';
    await mongoose.disconnect();
    await mongoose.connect(testDbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
}, 10000);

beforeEach(async () => {
    // await Student.deleteMany();
});

afterAll(async () => {
    // delete all collections
    await mongoose.disconnect();
});

describe('Course Controller - createCourse', () => {
    it('educator should be able create a new course', async () => {
        const educator = {
            email: 'testeducator@example.com',
            password: 'testPassword'
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator);

        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Logged In Successfully - Educator');
        expect(res.body.token).to.not.equal(null);

        const course = {
            courseTitle: 'Test Course',
            courseDescription: 'This is a test course.',
            courseDescriptionLong: 'A longer description of the test course.',
            coursePrice: 19.99,
            tags: ['Programming', 'Testing'],
            courseLevel: 'Beginner',
            courseCode: 'TEST123',
            language: 'English',
            visibility: 'public',
            prerequisites: 'Basic knowledge of programming',
            discussionForum: 'true', // Set to 'true' if you want to enable the discussion forum
        };
        const imagePath = path.join(__dirname, 'images.png'); // Replace with the actual path to your educator's profile picture
        const profilePic = fs.readFileSync(imagePath);

        const res2 = await request(app)
            .post('/educator/create-course')
            .set('Authorization', 'Bearer ' + res.body.token)
            .field('courseTitle', course.courseTitle)
            .field('courseDescription', course.courseDescription)
            .field('courseDescriptionLong', course.courseDescriptionLong)
            .field('coursePrice', course.coursePrice)
            .field('tags', course.tags)
            .field('courseLevel', course.courseLevel)
            .field('courseCode', course.courseCode)
            .field('language', course.language)
            .field('visibility', course.visibility)
            .field('prerequisites', course.prerequisites)
            .field('discussionForum', course.discussionForum)
            .attach('thumbnail', profilePic, 'profilePic.png');


        expect(res2.statusCode).to.equal(201);
        expect(res2.body.message).to.equal('Course created');
    });
    it('student should not be able to create a new course', async () => {
        const educator = {
            email: 'teststudent@example.com',
            password: 'testPassword'
        };

        const res = await request(app)
            .post('/student/login')
            .send(educator);

        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Logged In Successfully - Student');
        expect(res.body.token).to.not.equal(null);

        const course = {
            courseTitle: 'Test Course',
            courseDescription: 'This is a test course.',
            courseDescriptionLong: 'A longer description of the test course.',
            coursePrice: 19.99,
            tags: ['Programming', 'Testing'],
            courseLevel: 'Beginner',
            courseCode: 'TEST123',
            language: 'English',
            visibility: 'public',
            prerequisites: 'Basic knowledge of programming',
            discussionForum: 'true', // Set to 'true' if you want to enable the discussion forum
        };

        const res2 = await request(app)
            .post('/educator/create-course')
            .set('Authorization', 'Bearer ' + res.body.token)
            .send(course);

        expect(res2.statusCode).to.equal(401);
        expect(res2.body.message).to.equal('Unauthorized');
    });
    it('educator cannot create a course with the same course code', async () => {
        const educator = {
            email: 'testeducator@example.com',
            password: 'testPassword'
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator);

        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Logged In Successfully - Educator');
        expect(res.body.token).to.not.equal(null);

        const course = {
            courseTitle: 'Test Course',
            courseDescription: 'This is a test course.',
            courseDescriptionLong: 'A longer description of the test course.',
            coursePrice: 19.99,
            tags: ['Programming', 'Testing'],
            courseLevel: 'Beginner',
            courseCode: 'TEST123',
            language: 'English',
            visibility: 'public',
            prerequisites: 'Basic knowledge of programming',
            discussionForum: 'true', // Set to 'true' if you want to enable the discussion forum
        };

        const res2 = await request(app)
            .post('/educator/create-course')
            .set('Authorization', 'Bearer ' + res.body.token)
            .send(course);

        expect(res2.statusCode).to.equal(409);
        expect(res2.body.message).to.equal('Course code already exists');
    });
});

describe('Course Controller - editCourse', () => {
    it('creator of course should be able to edit course', async () => {
        const educator = {
            email: 'testeducator@example.com',
            password: 'testPassword'
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator);

        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Logged In Successfully - Educator');
        expect(res.body.token).to.not.equal(null);

        //     take one course from educator's course list
        const course = await Educator.findOne({email: 'testeducator@example.com'}).populate('courseCreated');
        const courseId = course.courseCreated[0]._id;

        const courseEdit = {
            courseTitle: 'Test Course Edited',
            courseDescription: 'This is a test course.',
            courseDescriptionLong: 'A longer description of the test course.',
            coursePrice: 19.99,
            tags: ['Programming', 'Testing'],
            courseLevel: 'Beginner',
            courseCode: 'TEST123',
            language: 'English',
            visibility: 'public',
            prerequisites: 'Basic knowledge of programming',
        };
        const imagePath = path.join(__dirname, 'images.png'); // Replace with the actual path to your educator's profile picture
        const profilePic = fs.readFileSync(imagePath);

        const res2 = await request(app)
            .patch(`/educator/edit-course/${courseId}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .field('courseTitle', courseEdit.courseTitle)
            .field('courseDescription', courseEdit.courseDescription)
            .field('courseDescriptionLong', courseEdit.courseDescriptionLong)
            .field('coursePrice', courseEdit.coursePrice)
            .field('tags', courseEdit.tags)
            .field('courseLevel', courseEdit.courseLevel)
            .field('courseCode', courseEdit.courseCode)
            .field('language', courseEdit.language)
            .field('visibility', courseEdit.visibility)
            .field('prerequisites', courseEdit.prerequisites)
            .attach('thumbnail', profilePic, 'profilePic.png');

        expect(res2.statusCode).to.equal(200);
        expect(res2.body.message).to.equal('Course updated');
    });
    it('other educator should not be able to edit course', async () => {
        const educator = {
            fname: 'Test',
            lname: 'Educator2',
            gender: 'Male',
            dob: '1990-01-01',
            location: 'Test Location',
            username: 'test1educator',
            password: 'testPassword',
            phone: '1234567190',
            email: 'testeduc1ator@example.com',
            upiID: 'testUPI@okAxis',
            bio: 'Test bio'
        }

        const res = await request(app)
            .post('/educator/signup')
            .send(educator);

        expect(res.statusCode).to.equal(201);
        expect(res.body.message).to.equal('Educator created');

        const res1 = await request(app)
            .post('/educator/login')
            .send(educator);

        expect(res1.statusCode).to.equal(200);
        expect(res1.body.message).to.equal('Logged In Successfully - Educator');

        const course = await Educator.findOne({email: 'testeducator@example.com'}).populate('courseCreated');
        const courseId = course.courseCreated[0]._id;

        const courseEdit = {
            courseTitle: 'Test Course Edited',
            courseDescription: 'This is a test course.',
            courseDescriptionLong: 'A longer description of the test course.',
            coursePrice: 19.99,
            tags: ['Programming', 'Testing'],
            courseLevel: 'Beginner',
            courseCode: 'TEST123',
            language: 'English',
            visibility: 'public',
            prerequisites: 'Basic knowledge of programming',
        };

        const res2 = await request(app)
            .patch(`/educator/edit-course/${courseId}`)
            .set('Authorization', 'Bearer ' + res1.body.token)
            .send(courseEdit);

        expect(res2.statusCode).to.equal(401);
        expect(res2.body.message).to.equal('Unauthorized');
    });
    it('if course does not exist, should return 404', async () => {
        const educator = {
            email: 'testeducator@example.com',
            password: 'testPassword'
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator);

        const courseId = '5f9e9b3b3b3b3b3b3b3b3b3b';

        const res2 = await request(app)
            .patch(`/educator/edit-course/${courseId}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send({});

        expect(res2.statusCode).to.equal(404);
        expect(res2.body.message).to.equal('Course not found');
    });
});

describe('Course Controller - deleteCourse', () => {
    it('if course does not exist, should return 404', async () => {
        const educator = {
            email: 'testeducator@example.com',
            password: 'testPassword'
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator);

        const courseId = '5f9e9b3b3b3b3b3b3b3b3b3b';

        const res2 = await request(app)
            .patch(`/educator/edit-course/${courseId}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send({});

        expect(res2.statusCode).to.equal(404);
        expect(res2.body.message).to.equal('Course not found');
    });
    it('other educator should not be able to delete course', async () => {
        const educator = {
            fname: 'Test',
            lname: 'Educator2',
            gender: 'Male',
            dob: '1990-01-01',
            location: 'Test Location',
            username: 'test1educator',
            password: 'testPassword',
            phone: '1234567190',
            email: 'testeduc1ator@example.com',
            upiID: 'testUPI@okAxis',
            bio: 'Test bio'
        }

        const res1 = await request(app)
            .post('/educator/login')
            .send(educator);

        expect(res1.statusCode).to.equal(200);
        expect(res1.body.message).to.equal('Logged In Successfully - Educator');

        const course = await Educator.findOne({email: 'testeducator@example.com'}).populate('courseCreated');
        const courseId = course.courseCreated[0]._id;

        const res2 = await request(app)
            .post(`/educator/delete-course/${courseId}`)
            .set('Authorization', 'Bearer ' + res1.body.token)
            .send({});

        expect(res2.statusCode).to.equal(401);
        expect(res2.body.message).to.equal('Unauthorized');
    });
    it('creator of course should be able to delete course', async () => {
        const educator = {
            email: 'testeducator@example.com',
            password: 'testPassword'
        };
        const edu = await Educator.findOne({email: 'testeducator@example.com'}).populate('courseCreated');
        const courseId = edu.courseCreated[0]._id;

        const res = await request(app)
            .post('/educator/login')
            .send(educator);

        const res1 = await request(app)
            .post(`/educator/delete-course/${courseId}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send({});

        expect(res1.statusCode).to.equal(200);
        expect(res1.body.message).to.equal('Email sent successfully');
    });
});

describe('Course Controller - enrollCourse', () => {
    it('student should be able to enroll in a course', async () => {
        const student = {
            email: 'teststudent@example.com',
            password: 'testPassword'
        };

        const course = await Course.findOne({});
        const res = await request(app)
            .post('/student/login')
            .send(student);

        const res1 = await request(app)
            .post(`/student/enroll/${course._id}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send({});

        console.log(res1.body);
        expect(res1.statusCode).to.equal(200);
        expect(res1.body.message).to.equal('Enrolled');
    });
    it('if course does not exist, should return 404', async () => {
        const student = {
            email: 'teststudent@example.com',
            password: 'testPassword'
        };

        const res = await request(app)
            .post('/student/login')
            .send(student);

        const courseId = '5f9e9b3b3b3b3b3b3b3b3b3b';
        const res1 = await request(app)
            .post(`/student/enroll/${courseId}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send({});

        expect(res1.statusCode).to.equal(404);
        expect(res1.body.message).to.equal('Course not found');
    });
    it('if student is already enrolled, should return 401', async () => {
        const student = {
            email: 'teststudent@example.com',
            password: 'testPassword'
        };

        const res = await request(app)
            .post('/student/login')
            .send(student);

        const course = await Course.findOne({});
        const res1 = await request(app)
            .post(`/student/enroll/${course._id}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send({});

        expect(res1.statusCode).to.equal(401);
        expect(res1.body.message).to.equal('Already enrolled');
    });
    it('if course is private, should return 401', async () => {
        const student = {
            email: 'teststudent@example.com',
            password: 'testPassword'
        };

        const res = await request(app)
            .post('/student/login')
            .send(student);

        const course = await Course.findOne({});
        const res1 = await request(app)
            .post(`/student/enroll/${course._id}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send({});

        if (course.visibility === 'private') {
            expect(res1.statusCode).to.equal(401);
            expect(res1.body.message).to.equal('It is a private course');
        }
    });
});

describe('Course Controller - unenrollCourse', () => {
    it('student should be able to unenroll from a course', async () => {
        const student = {
            email: 'teststudent@example.com',
            password: 'testPassword'
        };

        const res = await request(app)
            .post('/student/login')
            .send(student);

        const course = await Course.findOne({});
        const res1 = await request(app)
            .post(`/student/enroll/${course._id}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send({});

        if (res1.statusCode === 200) {
            const res2 = await request(app)
                .post(`/student/unroll/${course._id}`)
                .set('Authorization', 'Bearer ' + res.body.token)
                .send({});

            expect(res2.statusCode).to.equal(200);
            expect(res2.body.message).to.equal('Unenrolled Successfully');
        }
    });
    it('if course does not exist, should return 404', async () => {
        const student = {
            email: 'teststudent@example.com',
            password: 'testPassword'
        };

        const res = await request(app)
            .post('/student/login')
            .send(student);

        const courseId = '5f9e9b3b3b3b3b3b3b3b3b3b';
        const res1 = await request(app)
            .post(`/student/enroll/${courseId}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send({});

        expect(res1.statusCode).to.equal(404);
        expect(res1.body.message).to.equal('Course not found');
    });
});

describe('Course Controller - removeStudent', () => {
    it('should remove student from course', async () => {
        const educator = {
            email: 'testeducator@example.com',
            password: 'testPassword'
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator);

        const course = await Course.findOne({});
        const student = course.enrolledStudents[0];

        const res1 = await request(app)
            .post(`/educator/remove-student/${course._id}/${student}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send({});

        expect(res1.statusCode).to.equal(200);
        expect(res1.body.message).to.equal('Student removed');
    });
    it('if course does not exist, should return 404', async () => {
        const educator = {
            email: 'testeducator@example.com',
            password: 'testPassword'
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator);

        const course = "5f9e9b3b3b3b3b3b3b3b3b3b";
        const student = "5f9e9b3b3b3b3b3b3b3b3b3b";

        const res1 = await request(app)
            .post(`/educator/remove-student/${course}/${student}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send({});

        expect(res1.statusCode).to.equal(404);
        expect(res1.body.message).to.equal('Course not found');
    });
});
describe('Course Controller - rateCourse', () => {
    it('should rate course', async () => {
        const student = {
            email: 'teststudent@example.com',
            password: 'testPassword'
        };

        const course = await Course.findOne({});
        const res = await request(app)
            .post('/student/login')
            .send(student);

        const res1 = await request(app)
            .post(`/student/enroll/${course._id}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send({});

        const enrolledCourse = await Student.findOne({email: 'teststudent@example.com'});

        const res2 = await request(app)
            .post(`/student/rating/${enrolledCourse.enrolledCourses[0]}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send({
                rating: 4,
                comment: 'Nice'
            });

        console.log(res2.body);
        expect(res2.statusCode).to.equal(200);
        expect(res2.body.message).to.equal('Rated Successfully');
    });
    it('if course does not exist, should return 404', async () => {
        const student = {
            email: 'teststudent@example.com',
            password: 'testPassword'
        };

        const res = await request(app)
            .post('/student/login')
            .send(student);

        const res1 = await request(app)
            .post(`/student/rating/5f9e9b3b3b3b3b3b3b3b3b3b`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send({
                rating: 4
            });

        expect(res1.statusCode).to.equal(404);
        expect(res1.body.message).to.equal('Course not found');
    });
    it('if already rated, should return 401', async () => {
        const student = {
            email: 'teststudent@example.com',
            password: 'testPassword'
        };

        const res = await request(app)
            .post('/student/login')
            .send(student);

        const enrolledCourse = await Student.findOne({email: 'teststudent@example.com'}).populate('enrolledCourses');

        const res1 = await request(app)
            .post(`/student/rating/${enrolledCourse.enrolledCourses[0]._id}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send({
                rating: 4
            });

        expect(res1.statusCode).to.equal(401);
        expect(res1.body.message).to.equal('Already rated');
    });
});