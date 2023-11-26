const mongoose = require('mongoose');
const app = require('../app');
const Student = require('../api/models/student');
const Educator = require('../api/models/educator');
const Course = require('../api/models/course');
const request = require('supertest');
const {expect} = require("chai");
const path = require('path');
const fs = require('fs');

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

describe('Query Controller - getAllCourses', () => {
    it('should return all courses', async () => {
        const res = await request(app)
            .get('/query/allcourse')
            .send();

        expect(res.statusCode).equal(200);
        expect(res.body).to.have.property('courses');
    });
});

describe('Query Controller - getCourseByEducator', () => {
    it('should return all courses by educator', async () => {
        const educator = {
            email: 'testeducator@example.com',
            password: 'testPassword'
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator);

        const res2 = await request(app)
            .get('/query/coursebyeducator')
            .set('Authorization', 'Bearer ' + res.body.token)
            .send();

        expect(res2.statusCode).to.equal(200);
        expect(res2.body).to.have.property('courses');
    });
    it('should return 401 if not logged in', async () => {
        const res = await request(app)
            .get('/query/coursebyeducator')
            .send();

        expect(res.statusCode).to.equal(401);
        expect(res.body.message).to.equal('Invalid token');
    });
    it('should return 404 if educator does not have any courses', async () => {
        const educator = {
            email: 'testeduc1ator@example.com',
            password: 'testPassword'
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator);

        const res2 = await request(app)
            .get('/query/coursebyeducator')
            .set('Authorization', 'Bearer ' + res.body.token)
            .send();

        expect(res2.statusCode).to.equal(200);
        expect(res2.body.courses).to.be.an('array').that.is.empty;
    });
});

describe('Query Controller - getDashboard', () => {
    it('should not return dashboard if it is not an educator', async () => {
        const student = {
            email: 'teststudent@example.com',
            password: 'testPassword'
        };

        const res = await request(app)
            .post('/student/login')
            .send(student);

        const res2 = await request(app)
            .get('/query/dashboard')
            .set('Authorization', 'Bearer ' + res.body.token)
            .send();

        expect(res2.statusCode).to.equal(401);
        expect(res2.body.message).to.equal('This is not an educator account');
    });
    it('should return dashboard if it is an educator', async () => {
        const educator = {
            email: 'testeducator@example.com',
            password: 'testPassword'
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator);

        const res2 = await request(app)
            .get('/query/dashboard')
            .set('Authorization', 'Bearer ' + res.body.token)
            .send();

        expect(res2.statusCode).to.equal(200);
        expect(res2.body).to.have.property('totalEarning');
        expect(res2.body).to.have.property('totalStudent');
        expect(res2.body).to.have.property('totalCourses');
        expect(res2.body).to.have.property('avgRating');
    });
});

describe('Query Controller - getProfile', () => {
    it('should return profile if it is an educator', async () => {
        const educator = {
            email: 'testeducator@example.com',
            password: 'testPassword'
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator);

        const res2 = await request(app)
            .get('/query/profile')
            .set('Authorization', 'Bearer ' + res.body.token)
            .send();

        expect(res2.statusCode).to.equal(200);
        expect(res2.body).to.have.property('educator');
    });
    it('should return profile if it is a student', async () => {
        const student = {
            email: 'teststudent@example.com',
            password: 'testPassword'
        };

        const res = await request(app)
            .post('/student/login')
            .send(student);

        const res2 = await request(app)
            .get('/query/profile')
            .set('Authorization', 'Bearer ' + res.body.token)
            .send();

        expect(res2.statusCode).to.equal(200);
        expect(res2.body).to.have.property('student');
    });
    it('should return 401 if user not found', async () => {
        const edu = {
            email: 'testeduc1ator@example.com',
            password: 'testPassword'
        };

        const res = await request(app)
            .post('/educator/login')
            .send(edu);

        await Educator.deleteOne({email: 'testeduc1ator@example.com'});

        const res2 = await request(app)
            .get('/query/profile')
            .set('Authorization', 'Bearer ' + res.body.token)
            .send();

        expect(res2.statusCode).to.equal(404);
        expect(res2.body.message).to.equal('Educator not found');
    });
});

describe('Query Controller - getCoursePage', () => {
    it('should return course page', async () => {
        const student = {
            email: 'teststudent@example.com',
            password: 'testPassword'
        };

        let res = await request(app)
            .post('/student/login')
            .send(student);

        const course = await Course.findOne({});
        res = await request(app)
            .get(`/query/getCourse/${course._id}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send();

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('course');
    });
    it('should return 404 if course not found', async () => {
        const student = {
            email: 'teststudent@example.com',
            password: 'testPassword'
        };

        let res = await request(app)
            .post('/student/login')
            .send(student);

        res = await request(app)
            .get(`/query/getCourse/123456789012`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send();

        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Course not found');
    });
    it('should return course page', async () => {
        const educator = {
            email: 'testeducator@example.com',
            password: 'testPassword'
        };

        let res = await request(app)
            .post('/educator/login')
            .send(educator);

        const course = await Course.findOne({});
        res = await request(app)
            .get(`/query/getCourse/${course._id}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send();

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('course');
    });
});

describe('Query Controller - getEnrolledCourses', () => {
    it('should return enrolled courses', async () => {
        const student = {
            email: 'teststudent@example.com',
            password: 'testPassword'
        };

        let res = await request(app)
            .post('/student/login')
            .send(student);

        res = await request(app)
            .get('/query/enrolled-course')
            .set('Authorization', 'Bearer ' + res.body.token)
            .send();

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('courses');
    });
});

describe('Query Controller - getRecommendedCourses', () => {
    it('should return recommended courses', async () => {
        const student = {
            email: 'teststudent@example.com',
            password: 'testPassword'
        };

        let res = await request(app)
            .post('/student/login')
            .send(student);

        res = await request(app)
            .get('/query/recommended-course')
            .set('Authorization', 'Bearer ' + res.body.token)
            .send();

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('courses');
    });
});

describe('Query Controller - generateGraph', () => {
    it('should return graph', async () => {
        const educator = {
            email: 'testeducator@example.com',
            password: 'testPassword'
        };

        let res = await request(app)
            .post('/educator/login')
            .send(educator);

        res = await request(app)
            .get('/query/generateGraph')
            .set('Authorization', 'Bearer ' + res.body.token)
            .send();

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('courseTitle');
        expect(res.body).to.have.property('enrolled');
    });
});