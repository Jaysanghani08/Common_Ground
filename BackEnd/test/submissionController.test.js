const mongoose = require('mongoose');
const app = require('../app');
const Student = require('../api/models/student');
const Educator = require('../api/models/educator');
const Course = require('../api/models/course');
const Assignment = require('../api/models/assignment');
const Submission = require('../api/models/submission');
const request = require('supertest');
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

describe('Submission Controller - submit', () => {
    it('should return 404 if assignment is not found', async () => {
        const student = {
            email: 'teststudent@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/student/login')
            .send(student);

        const stu = await Student.findOne({email: student.email});

        const submission = {
            submission: 'testSubmission',
        };
        const res2 = await request(app)
            .post(`/student/submit-assignment/${stu.enrolledCourses[0]}/655a10bd1787942f1711ba04`)
            .send(submission)
            .set('Authorization', 'Bearer ' + res.body.token);

        console.log(res2.body);
        expect(res2.statusCode).to.equal(404);
        expect(res2.body.message).to.equal('Assignment not found');
    });
    it('should return 401 if assignment submission time is over', async () => {
        const student = {
            email: 'teststudent@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/student/login')
            .send(student);

        const stu = await Student.findOne({email: student.email});
        const course = await Course.findById(stu.enrolledCourses[0]);
        const assignment = new Assignment({
            title: 'testAssignment',
            description: 'testDescription',
            dueDate: '2021-04-01',
            attachment: 'testAttachment',
            course: stu.enrolledCourses[0],
            assignedBy: course.createdBy
        });

        await assignment.save();

        const submission = {
            submission: 'testSubmission',
        };


        const res2 = await request(app)
            .post(`/student/submit-assignment/${stu.enrolledCourses[0]}/${assignment._id}`)
            .send(submission)
            .set('Authorization', 'Bearer ' + res.body.token);

        expect(res2.statusCode).to.equal(401);
        expect(res2.body.message).to.equal('Assignment submission time is over');
    });
    it('should return 404 if course is not found', async () => {
        const student = {
            email: 'teststudent@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/student/login')
            .send(student);

        const submission = {
            submission: 'testSubmission',
        };

        const res2 = await request(app)
            .post(`/student/submit-assignment/123456789012345678901234/123456789012345678901234`)
            .send(submission)
            .set('Authorization', 'Bearer ' + res.body.token);

        expect(res2.statusCode).to.equal(404);
        expect(res2.body.message).to.equal('Course not found');
    });
    it('should return 401 if student is not enrolled in the course', async () => {
        const student = {
            email: 'teststudent@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/student/login')
            .send(student);

        const stu = await Student.findOne({email: student.email});
        const course = await Course.findById(stu.enrolledCourses[0]);
        course.enrolledStudents.pull(stu._id);
        await course.save();

        const submission = {
            submission: 'testSubmission',
        };

        const res2 = await request(app)
            .post(`/student/submit-assignment/${stu.enrolledCourses[0]}/123456789012345678901234`)
            .send(submission)
            .set('Authorization', 'Bearer ' + res.body.token);

        course.enrolledStudents.push(stu._id);
        await course.save();
        expect(res2.statusCode).to.equal(401);
        expect(res2.body.message).to.equal('You are not enrolled in this course');
    });
    it('should submit assignment successfully', async () => {
        const student = {
            email: 'teststudent@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/student/login')
            .send(student);

        const stu = await Student.findOne({email: student.email});
        const course = await Course.findById(stu.enrolledCourses[0]);
        const assignment = new Assignment({
            title: 'testAssignment',
            description: 'testDescription',
            dueDate: '2028-04-30',
            attachment: 'testAttachment',
            course: stu.enrolledCourses[0],
            assignedBy: course.createdBy
        });

        await assignment.save();

        const submission = {
            submission: 'testSubmission',
        };

        const res2 = await request(app)
            .post(`/student/submit-assignment/${stu.enrolledCourses[0]}/${assignment._id}`)
            .send(submission)
            .set('Authorization', 'Bearer ' + res.body.token);

        expect(res2.statusCode).to.equal(201);
        expect(res2.body.message).to.equal('Submission successful');
    });
});

describe('Submission Controller - delete', () => {
    it('should return 404 if course is not found', async () => {
        const student = {
            email: 'teststudent@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/student/login')
            .send(student);

        const res2 = await request(app)
            .delete(`/student/delete-submission/123456789012345678901234/123456789012345678901234`)
            .set('Authorization', 'Bearer ' + res.body.token);

        expect(res2.statusCode).to.equal(404);
        expect(res2.body.message).to.equal('Course not found');
    });
    it('should return 401 if student is not enrolled in the course', async () => {
        const student = {
            email: 'teststudent@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/student/login')
            .send(student);

        const stu = await Student.findOne({email: student.email});
        const course = await Course.findOne();
        course.enrolledStudents.pull(stu._id);
        await course.save();

        const res2 = await request(app)
            .delete(`/student/delete-submission/${course._id}/123456789012345678901234`)
            .set('Authorization', 'Bearer ' + res.body.token);

        expect(res2.statusCode).to.equal(401);
        expect(res2.body.message).to.equal('You are not enrolled in this course');
    });
    it('should return 404 if submission is not found', async () => {
        const student = {
            email: 'teststudent@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/student/login')
            .send(student);

        const stu = await Student.findOne({email: student.email});
        const course = await Course.findOne();
        course.enrolledStudents.push(stu._id);
        await course.save();

        const res2 = await request(app)
            .delete(`/student/delete-submission/${course._id}/123456789012345678901234`)
            .set('Authorization', 'Bearer ' + res.body.token);

        expect(res2.statusCode).to.equal(404);
        expect(res2.body.message).to.equal('Submission not found');
    });
});