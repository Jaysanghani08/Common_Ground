const mongoose = require('mongoose');
const app = require('../app');
const Student = require('../api/models/student');
const request = require('supertest');
const {expect} = require("chai");

beforeAll(async () => {
    const testDbUrl = 'mongodb+srv://Group16:Group16@cluster0.vfhbrkw.mongodb.net/Test_Common_Ground?retryWrites=true&w=majority';
    await mongoose.disconnect();
    await mongoose.connect(testDbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
});

beforeEach(async () => {
    // await Student.deleteMany();
});

afterAll(async () => {
    // delete all collections
    await mongoose.disconnect();
});

describe('Student Controller - userSignup', () => {
    it('should create a new student account', async () => {
        const testStudent = {
            fname: 'Test',
            lname: 'Student',
            gender: 'Male',
            location: 'Test Location',
            dob: '1990-01-01',
            username: 'teststudent',
            password: 'testPassword',
            phone: '1234567890',
            email: 'teststudent@example.com',
            interests: ['Programming', 'Testing'],
            bookmarkedCourses: [],
            enrolledCourses: [],
        };

        const res = await request(app)
            .post('/student/signup')
            .send(testStudent);

        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('Student created');
    });

    it('should handle duplicate email during signup', async () => {
        const initialStudent = {
            fname: 'Test',
            lname: 'Student',
            gender: 'Male',
            location: 'Test Location',
            dob: '1990-01-01',
            username: 'teststudent',
            password: 'testPassword',
            phone: '1234567890',
            email: 'teststudent@example.com',
            interests: ['Programming', 'Testing'],
            bookmarkedCourses: [],
            enrolledCourses: [],
        };

        // Make the first request to create the initial student
        await request(app)
            .post('/student/signup')
            .send(initialStudent);

        const duplicateStudent = {
            fname: 'Test',
            lname: 'Student',
            gender: 'Male',
            location: 'Test Location',
            dob: '1990-01-01',
            username: 'te2ststudent',
            password: 'testPassword',
            phone: '1234267890',
            email: 'teststudent@example.com',
            interests: ['Programming', 'Testing'],
            bookmarkedCourses: [],
            enrolledCourses: [],
        };

        const res = await request(app)
            .post('/student/signup')
            .send(duplicateStudent);

        expect(res.status).to.equal(409);
        expect(res.body.message).to.equal('Mail is already in use - Student');
    });

    it('should handle duplicate username during signup', async () => {
        const initialStudent = {
            fname: 'Test',
            lname: 'Student',
            gender: 'Male',
            location: 'Test Location',
            dob: '1990-01-01',
            username: 'teststudent',
            password: 'testPassword',
            phone: '1234567890',
            email: 'teststudent@example.com',
            interests: ['Programming', 'Testing'],
            bookmarkedCourses: [],
            enrolledCourses: [],
        };

        // Make the first request to create the initial student
        await request(app)
            .post('/student/signup')
            .send(initialStudent);

        const duplicateUsernameStudent = {
            fname: 'Test',
            lname: 'Student',
            gender: 'Male',
            location: 'Test Location',
            dob: '1990-01-01',
            username: 'teststudent', // Use the same username as the initial student
            password: 'testPassword',
            phone: '1234267890',
            email: 'teststudent2@example.com',
            interests: ['Programming', 'Testing'],
            bookmarkedCourses: [],
            enrolledCourses: [],
        };

        const res = await request(app)
            .post('/student/signup')
            .send(duplicateUsernameStudent);

        expect(res.status).to.equal(409);
        expect(res.body.message).to.equal('Username is already in use - Student');
    });

    it('should handle duplicate phone number during signup', async () => {
        const initialStudent = {
            fname: 'Test',
            lname: 'Student',
            gender: 'Male',
            location: 'Test Location',
            dob: '1990-01-01',
            username: 'teststudent',
            password: 'testPassword',
            phone: '1234567890',
            email: 'teststudent@example.com',
            interests: ['Programming', 'Testing'],
            bookmarkedCourses: [],
            enrolledCourses: [],
        };

        // Make the first request to create the initial student
        await request(app)
            .post('/student/signup')
            .send(initialStudent);

        const duplicatePhoneStudent = {
            fname: 'Test',
            lname: 'Student',
            gender: 'Male',
            location: 'Test Location',
            dob: '1990-01-01',
            username: 'teststudent2',
            password: 'testPassword',
            phone: '1234567890', // Use the same phone number as the initial student
            email: 'teststudent2@example.com',
            interests: ['Programming', 'Testing'],
            bookmarkedCourses: [],
            enrolledCourses: [],
        };

        const res = await request(app)
            .post('/student/signup')
            .send(duplicatePhoneStudent);

        expect(res.status).to.equal(409);
        expect(res.body.message).to.equal('Phone number is already in use - Student');
    });
});

describe('Student Controller - userLogin', () => {
    it('should login a student', async () => {
        const student = {
            email: 'teststudent@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/student/login')
            .send(student);

        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Logged In Successfully - Student');
        expect(res.body).to.have.property('token');
    });
    it('should not login a student with incorrect password', async () => {
        const student = {
            email: 'teststudent@example.com',
            password: 'testPassword1',
        };

        const res = await request(app)
            .post('/student/login')
            .send(student);

        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Wrong Password - Student');
    });
    it('should not login a student with incorrect email', async () => {
        const student = {
            email: 'teststu1dent@example.com',
            password: 'testPassword1',
        };

        const res = await request(app)
            .post('/student/login')
            .send(student);

        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('User does not exist - Student');
    });
});
describe('Student Controller - userEdit', () => {
    it('should userId from jwt as student exists', async () => {
        const editRes = await request(app)
            .patch('/student/edit-profile')
            .set('Authorization', 'Bearer ' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MDAyOTk0NjksImV4cCI6MTczMTgzNTQ2OSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInVzZXJJZCI6IjkzODkzNDg5Mzg5MzUzNDA1MzQifQ.NdhN2vzwVFjnhVhjI-s5z-EL2ZrhMfEmhDcfSbk_YDA")
            .send({
                fname: 'EditedTest',
            });

        expect(editRes.status).to.equal(401);
        expect(editRes.body.message).to.equal('Invalid token');
    });
    it('should edit a student', async () => {
        const loginRes = await request(app)
            .post('/student/login')
            .send({
                email: 'teststudent@example.com',
                password: 'testPassword',
            });

        // Edit the student profile without changing the profile picture
        const editRes = await request(app)
            .patch('/student/edit-profile')
            .set('Authorization', 'Bearer ' + loginRes.body.token)
            .send({
                fname: 'JaySabva',
            });

        expect(editRes.status).to.equal(200);
        expect(editRes.body.message).to.equal('Student updated');
    });
    it('should handle errors during profile editing', async () => {
        // Force an error during profile editing
        const editRes = await request(app)
            .patch('/student/edit')
            .set('Authorization', 'Bearer ' + 'invalidtoken')
            .send({
                fname: 'EditedTest',
            });

        expect(editRes.status).to.equal(404);
        expect(editRes.body).to.have.property('error');

    });
});

describe('Student Controller - userDelete', () => {
    it('should delete a student', async () => {
        const loginRes = await request(app)
            .post('/student/login')
            .send({
                email: 'teststudent@example.com',
                password: 'testPassword',
            });
        const deleteRes = await request(app)
            .delete('/student/teststudent@example.com')
            .set('Authorization', 'Bearer ' + loginRes.body.token);

        expect(deleteRes.status).to.equal(200);
        expect(deleteRes.body.message).to.equal('Student deleted');
    });
    it('should return 404 if student does not exist', async () => {
        const testStudent = {
            fname: 'Test',
            lname: 'Student',
            gender: 'Male',
            location: 'Test Location',
            dob: '1990-01-01',
            username: 'teststudent',
            password: 'testPassword',
            phone: '1234567890',
            email: 'teststudent@example.com',
            interests: ['Programming', 'Testing'],
            bookmarkedCourses: [],
            enrolledCourses: [],
        };

        const res = await request(app)
            .post('/student/signup')
            .send(testStudent);

        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('Student created');

        const loginRes = await request(app)
            .post('/student/login')
            .send({
                email: 'teststudent@example.com',
                password: 'testPassword',
            });

        const deleteRes = await request(app)
            .delete('/student/teststudent@example.com')
            .set('Authorization', 'Bearer ' + loginRes.body.token);

        const deleteRes2 = await request(app)
            .delete('/student/teststudent@example.com')
            .set('Authorization', 'Bearer ' + loginRes.body.token);

        expect(deleteRes2.status).to.equal(404);
        expect(deleteRes2.body.message).to.equal('Student not found');
    });
});

describe('Student Controller - resetPassword', () => {
    it('should reset password', async () => {
        const testStudent = {
            fname: 'Test',
            lname: 'Student',
            gender: 'Male',
            location: 'Test Location',
            dob: '1990-01-01',
            username: 'teststudent',
            password: 'testPassword',
            phone: '1234567890',
            email: 'teststudent@example.com',
            interests: ['Programming', 'Testing'],
            bookmarkedCourses: [],
            enrolledCourses: [],
        };

        const res = await request(app)
            .post('/student/signup')
            .send(testStudent);

        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('Student created');

        const resEmail = await request(app).post('/student/reset-password')
            .send({
                email: 'teststudent@example.com',
            });

        expect(resEmail.status).to.equal(200);
        expect(resEmail.body.message).to.equal('Email sent successfully');
    });
    it('should return 404 if student does not exist', async () => {
        const resEmail = await request(app).post('/student/reset-password')
            .send({
                email: 'teststudent@example1.com'
            });

        expect(resEmail.status).to.equal(404);
        expect(resEmail.body.message).to.equal('User not found - Student');
    });
});

describe('Student Controller - updatePassword', () => {
    it('should not update password if token is invalid', async () => {
        const resEmail = await request(app).post('/student/update-password')
            .send({
                email: 'teststudent@example.com'
            });

        expect(resEmail.status).to.equal(404);
        expect(resEmail.body.message).to.equal('Token not found - Student');
    });
    it('should return 404 if student does not exist', async () => {
        const resEmail = await request(app).post('/student/update-password')
            .send({
                email: 'teststudent@example1.com'
            });

        expect(resEmail.status).to.equal(404);
        expect(resEmail.body.message).to.equal('User not found - Student');
    });
});