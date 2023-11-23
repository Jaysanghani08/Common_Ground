const mongoose = require('mongoose');
const app = require('../app');
const Student = require('../api/models/student');
const Educator = require('../api/models/educator');
const Course = require('../api/models/course');
const Assignment = require('../api/models/assignment');
const Submission = require('../api/models/submission');
const request = require('supertest');
const expect = require('chai').expect;
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

describe('Assignment Controller - CreateAssignment', () => {
    it('should return 401 if user is not an educator', async () => {
        const student = {
            email: 'teststudent@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/student/login')
            .send(student);

        const stu = await Student.findOne({email: student.email});
        const assignment = {
            title: 'testAssignment',
            description: 'testDescription',
            dueDate: '2021-04-30',
            attachment: 'testAttachment'
        };
        const res2 = await request(app)
            .post(`/educator/create-assignment/${stu.enrolledCourses[0]}`)
            .send(assignment)
            .set('Authorization', 'Bearer ' + res.body.token);

        expect(res2.statusCode).to.equal(401);
        expect(res2.body.message).to.equal('Unauthorized');
    });
    it('should return 404 if course is not found', async () => {
        const educator = {
            email: 'testeducator@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator);

        const edu = await Educator.findOne({email: educator.email});
        const assignment = {
            title: 'testAssignment',
            description: 'testDescription',
            dueDate: '2021-04-30',
            attachment: 'testAttachment'
        };
        const res2 = await request(app)
            .post(`/educator/create-assignment/123456789012345678901234`)
            .send(assignment)
            .set('Authorization', 'Bearer ' + res.body.token);

        expect(res2.statusCode).to.equal(404);
        expect(res2.body.message).to.equal('Course not found');
    });
    it('should return 401 if educator is not the creator of the course', async () => {
        const educator = {
            email: 'testeduc1ator@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator);

        const edu = await Educator.findOne({email: 'testeducator@example.com'});
        const course = await Course.findOne({createdBy: edu._id});
        const assignment = {
            title: 'testAssignment',
            description: 'testDescription',
            dueDate: '2021-04-30',
            attachment: 'testAttachment'
        };
        const res2 = await request(app)
            .post(`/educator/create-assignment/${course._id}`)
            .send(assignment)
            .set('Authorization', 'Bearer ' + res.body.token);

        expect(res2.statusCode).to.equal(401);
        expect(res2.body.message).to.equal('Unauthorized');
    });
    it('should return 201 if assignment is created', async () => {
        const educator = {
            email: 'testeducator@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator);

        const edu = await Educator.findOne({email: educator.email});
        const course = await Course.findOne({createdBy: edu._id});
        const assignment = {
            title: 'testAssignment',
            description: 'testDescription',
            dueDate: '2021-04-30',
        };
        const imagePath = path.join(__dirname, 'images.png'); // Replace with the actual path to your educator's profile picture
        const profilePic = fs.readFileSync(imagePath);

        const res2 = await request(app)
            .post(`/educator/create-assignment/${course._id}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .field('title', assignment.title)
            .field('description', assignment.description)
            .field('dueDate', assignment.dueDate)
            .attach('attachments', profilePic, 'profilePic.png');

        console.log(res2.body);
        expect(res2.statusCode).to.equal(201);
        expect(res2.body.message).to.equal('Assignment created');
    });
});

describe('Assignment Controller - DeleteAssignment', () => {
    it('should return 401 if user is not an educator', async () => {
        const student = {
            email: 'teststudent@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/student/login')
            .send(student);

        const educator = await Educator.findOne({email: 'testeducator@example.com'}).exec();
        const stu = await Student.findOne({email: student.email});
        const assignment = await Assignment.findOne({assignedBy: educator._id});

        const res2 = await request(app)
            .delete(`/educator/delete-assignment/${stu.enrolledCourses[0]}/${assignment._id}`)
            .set('Authorization', 'Bearer ' + res.body.token);

        expect(res2.statusCode).to.equal(401);
        expect(res2.body.message).to.equal('Unauthorized');
    });
    it('should return 404 if assignment is not found', async () => {
        const educator = {
            email: 'testeducator@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator);

        const edu = await Educator.findOne({email: educator.email});
        const course = await Course.findOne({createdBy: edu._id});

        const res2 = await request(app)
            .delete(`/educator/delete-assignment/${course._id}/123456789012345678901234`)
            .set('Authorization', 'Bearer ' + res.body.token);

        expect(res2.statusCode).to.equal(404);
        expect(res2.body.message).to.equal('Assignment not found');
    });
    it('should return 401 if educator is not the creator of the course', async () => {
        const educator = {
            email: 'testeduc1ator@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator);

        const edu = await Educator.findOne({email: 'testeducator@example.com'});
        const course = await Course.findOne({createdBy: edu._id});
        const assignment = await Assignment.findOne({assignedBy: edu._id});

        const res2 = await request(app)
            .delete(`/educator/delete-assignment/${course._id}/${assignment._id}`)
            .set('Authorization', 'Bearer ' + res.body.token);

        expect(res2.statusCode).to.equal(401);
        expect(res2.body.message).to.equal('Unauthorized');
    });
    it('should return 200 if assignment is deleted', async () => {
        const educator = {
            email: 'testeducator@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator);

        const edu = await Educator.findOne({email: educator.email});
        const course = await Course.findOne({createdBy: edu._id});
        const assignment = await Assignment.findOne({assignedBy: edu._id});

        const res2 = await request(app)
            .delete(`/educator/delete-assignment/${course._id}/${assignment._id}`)
            .set('Authorization', 'Bearer ' + res.body.token);

        expect(res2.statusCode).to.equal(200);
        expect(res2.body.message).to.equal('Assignment deleted');
    });
});
describe('Assignment Controller - gradeSubmission', () => {
    it('should return 401 if user is not an educator', async () => {
        const student1 = {
            email: 'teststudent@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/student/login')
            .send(student1);

        const educator = await Educator.findOne({email: 'testeducator@example.com'}).exec();
        const course = await Course.findOne({createdBy: educator._id});
        const student = await Student.findOne({email: student1.email});
        course.enrolledStudents.push(student._id);
        await course.save();
        const assignment = new Assignment({
            title: 'testAssignment',
            description: 'testDescription',
            course: course._id,
            assignedBy: educator._id,
        });

        const imagePath = path.join(__dirname, 'images.png'); // Replace with the actual path to your educator's profile picture
        const profilePic = fs.readFileSync(imagePath);

        assignment.dueDate = new Date('2025-04-30');
        await assignment.save();
        const submission = {
            submission: 'testSubmission',
        };
        const res2 = await request(app)
            .post(`/student/submit-assignment/${assignment.course}/${assignment._id}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .field('submission', submission.submission)
            .attach('submission', profilePic, 'profilePic.png');

        assignment.submission.push(res2.body.submission._id);
        await assignment.save();
        console.log(res2.body);
        const res3 = await request(app)
            .post(`/educator/grade-assignment/${assignment.course}/${assignment._id}/${res2.body.submission._id}`)
            .set('Authorization', 'Bearer ' + res.body.token);

        expect(res3.statusCode).to.equal(401);
        expect(res3.body.message).to.equal('Unauthorized');
    });
    it('should return 404 if assignment is not found', async () => {
        const educator = {
            email: 'testeducator@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator);

        const edu = await Educator.findOne({email: educator.email});
        const course = await Course.findOne({createdBy: edu._id});
        const assignment = await Assignment.findOne({assignedBy: edu._id});

        const res2 = await request(app)
            .post(`/educator/grade-assignment/${course._id}/123456789012345678901234/${assignment.submission[0]}`)
            .set('Authorization', 'Bearer ' + res.body.token);

        expect(res2.statusCode).to.equal(404);
        expect(res2.body.message).to.equal('Assignment not found');
    });
    it('should return 404 if submission is not found', async () => {
        const educator = {
            email: 'testeducator@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator);

        const edu = await Educator.findOne({email: educator.email});
        const course = await Course.findOne({createdBy: edu._id});
        const assignment = await Assignment.findOne({assignedBy: edu._id});

        const res2 = await request(app)
            .post(`/educator/grade-assignment/${course._id}/${assignment._id}/123456789012345678901234`)
            .set('Authorization', 'Bearer ' + res.body.token);

        expect(res2.statusCode).to.equal(404);
        expect(res2.body.message).to.equal('Submission not found');
    });
    it('should return 401 if educator is not the creator of the course', async () => {
        const educator = {
            email: 'testeduc1ator@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator);

        const edu = await Educator.findOne({email: 'testeducator@example.com'});
        const course = await Course.findOne({createdBy: edu._id});
        const assignment = await Assignment.findOne({assignedBy: edu._id});

        const res2 = await request(app)
            .post(`/educator/grade-assignment/${course._id}/${assignment._id}/${assignment.submission[0]}`)
            .set('Authorization', 'Bearer ' + res.body.token);

        expect(res2.statusCode).to.equal(401);
        expect(res2.body.message).to.equal('Unauthorized');
    });
    it('should return 200 if submission is graded', async () => {
        const educator = {
            email: 'testeducator@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator);

        const edu = await Educator.findOne({email: educator.email});
        const course = await Course.findOne({createdBy: edu._id});
        const assignment = await Assignment.findOne({assignedBy: edu._id});
        const student = await Student.findOne({email: 'teststudent@example.com'});
        const submission = new Submission({
            assignment: assignment._id,
            submittedBy: student._id,
            submission: 'testSubmission',
        });

        await submission.save();
        const res2 = await request(app)
            .post(`/educator/grade-assignment/${course._id}/${assignment._id}/${assignment.submission[0]}`)
            .set('Authorization', 'Bearer ' + res.body.token);

        expect(res2.statusCode).to.equal(200);
        expect(res2.body.message).to.equal('Assignment graded');
    });
});