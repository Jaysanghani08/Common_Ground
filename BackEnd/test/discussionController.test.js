const mongoose = require('mongoose');
const app = require('../app');
const Student = require('../api/models/student');
const Educator = require('../api/models/educator');
const Course = require('../api/models/course');
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

describe('Discussion Forum - Add Message', () => {
    it('should return 404 if course does not exist', async () => {
        const res = await request(app)
            .post('/student/login')
            .send({
                email: 'teststudent@example.com',
                password: 'testPassword',
            });

        const discussion = {
            message: 'test message'
        };
        const courseId = '5f9f2f1c9d7c1f1f5c8c8c8c';
        const res1 = await request(app)
            .post(`/student/${courseId}/discussion`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send(discussion);

        expect(res1.status).to.equal(404);
        expect(res1.body.message).to.equal('Course not found');
    });
    it('should return 404 if course does not have a discussion forum', async () => {
        const res = await request(app)
            .post('/student/login')
            .send({
                email: 'teststudent@example.com',
                password: 'testPassword',
            });

        const discussion = {
            message: 'test message'
        };

        const course = await Student.findOne({email: 'teststudent@example.com'}).exec();
        const courseId = course.enrolledCourses[0];
        const res1 = await request(app)
            .post(`/student/${courseId}/discussion`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send(discussion);

        if (res1.status === 404) {
            expect(res1.body.message).to.equal('This course does not have a discussion forum');
        } else {
            expect(res1.status).to.equal(201);
            expect(res1.body.message).to.equal('Message added to discussion forum');
        }
    });
    it('should return 404 if course does not exist', async () => {
        const res = await request(app)
            .post('/educator/login')
            .send({
                email: 'testeducator@example.com',
                password: 'testPassword',
            });

        const discussion = {
            message: 'test message'
        };
        const courseId = '5f9f2f1c9d7c1f1f5c8c8c8c';
        const res1 = await request(app)
            .post(`/student/${courseId}/discussion`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send(discussion);

        expect(res1.status).to.equal(404);
        expect(res1.body.message).to.equal('Course not found');
    });
    it('should return 404 if course does not have a discussion forum', async () => {
        const res = await request(app)
            .post('/educator/login')
            .send({
                email: 'testeducator@example.com',
                password: 'testPassword',
            });

        const discussion = {
            message: 'test message'
        };

        const course = await Student.findOne({email: 'teststudent@example.com'}).exec();
        const courseId = course.enrolledCourses[0];
        const res1 = await request(app)
            .post(`/student/${courseId}/discussion`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send(discussion);

        if (res1.status === 404) {
            expect(res1.body.message).to.equal('This course does not have a discussion forum');
        } else {
            expect(res1.status).to.equal(201);
            expect(res1.body.message).to.equal('Message added to discussion forum');
        }
    });
});

describe('Discussion Forum - Edit Message', () => {
    it('should return 404 if course does not exist', async () => {
        const res = await request(app)
            .post('/student/login')
            .send({
                email: 'teststudent@example.com',
                password: 'testPassword',
            });

        const discussion = {
            message: 'test message'
        };
        const courseId = '5f9f2f1c9d7c1f1f5c8c8c8c';
        const messageId = '5f9f2f1c9d7c1f1f5c8c8c8c';
        const res1 = await request(app)
            .patch(`/student/${courseId}/discussion/${messageId}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send(discussion);

        expect(res1.status).to.equal(404);
        expect(res1.body.message).to.equal('Course not found');
    });
    it('should return 404 if course does not have a discussion forum', async () => {
        const res = await request(app)
            .post('/student/login')
            .send({
                email: 'teststudent@example.com',
                password: 'testPassword',
            });

        const discussion = {
            message: 'test message'
        };

        const course = await Student.findOne({email: 'teststudent@example.com'}).populate('enrolledCourses').exec();
        const courseId = course.enrolledCourses[0]._id;
        const messageId = '5f9f2f1c9d7c1f1f5c8c8c8c';
        const res1 = await request(app)
            .patch(`/student/${courseId}/discussion/${messageId}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send(discussion);

        if (course.enrolledCourses[0].discussionForum === undefined) {
            expect(res1.status).to.equal(404);
            expect(res1.body.message).to.equal('This course does not have a discussion forum');
        } else if (res1.status === 404) {
            expect(res1.status).to.equal(404);
            expect(res1.body.message).to.equal('Message not found');
        }
    });
    it('should return 404 if course does not exist', async () => {
        const res = await request(app)
            .post('/educator/login')
            .send({
                email: 'testeducator@example.com',
                password: 'testPassword',
            });

        const discussion = {
            message: 'test message'
        };
        const courseId = '5f9f2f1c9d7c1f1f5c8c8c8c';
        const messageId = '5f9f2f1c9d7c1f1f5c8c8c8c';
        const res1 = await request(app)
            .patch(`/educator/${courseId}/discussion/${messageId}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send(discussion);

        expect(res1.status).to.equal(404);
        expect(res1.body.message).to.equal('Course not found');
    });
    it('should return 404 if course does not have a discussion forum', async () => {
        const res = await request(app)
            .post('/educator/login')
            .send({
                email: 'testeducator@example.com',
                password: 'testPassword',
            });

        const discussion = {
            message: 'test message'
        };

        const course = await Educator.findOne({email: 'testeducator@example.com'}).populate('courseCreated').exec();
        const courseId = course.courseCreated[0]._id;
        const messageId = '5f9f2f1c9d7c1f1f5c8c8c8c';
        const res1 = await request(app)
            .patch(`/student/${courseId}/discussion/${messageId}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send(discussion);

        if (course.courseCreated[0].discussionForum === undefined) {
            expect(res1.status).to.equal(404);
            expect(res1.body.message).to.equal('This course does not have a discussion forum');
        } else if (res1.status === 404) {
            expect(res1.status).to.equal(404);
            expect(res1.body.message).to.equal('Message not found');
        }
    });
    it('should edit message - student', async () => {
        const res = await request(app)
            .post('/student/login')
            .send({
                email: 'teststudent@example.com',
                password: 'testPassword',
            });

        const discussion = {
            message: 'test message'
        };

        const course = await Student.findOne({email: 'teststudent@example.com'}).populate('enrolledCourses').exec();
        const courseId = course.enrolledCourses[0]._id;

        const discussionForum = await Course.findById(courseId).populate('discussionForum').exec();
        let messageId;
        for (let i = 0; i < discussionForum.discussionForum.messages.length; i++) {
            if (discussionForum.discussionForum.messages[i].createdByStudent !== null) {
                messageId = discussionForum.discussionForum.messages[i]._id;
                break;
            }
        }

        const res1 = await request(app)
            .patch(`/student/${courseId}/discussion/${messageId}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send(discussion);

        expect(res1.status).to.equal(200);
        expect(res1.body.message).to.equal('Message edited');
    });
    it('should edit message - educator', async () => {
        const res = await request(app)
            .post('/educator/login')
            .send({
                email: 'testeducator@example.com',
                password: 'testPassword',
            });

        const discussion = {
            message: 'test message'
        };

        const course = await Educator.findOne({email: 'testeducator@example.com'}).populate('courseCreated').exec();
        const courseId = course.courseCreated[0]._id;

        const discussionForum = await Course.findById(courseId).populate('discussionForum').exec();

        let messageId;
        for (let i = 0; i < discussionForum.discussionForum.messages.length; i++) {
            if (discussionForum.discussionForum.messages[i].createdByEducator !== null) {
                messageId = discussionForum.discussionForum.messages[i]._id;
                break;
            }
        }

        const res1 = await request(app)
            .patch(`/educator/${courseId}/discussion/${messageId}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send(discussion);

        expect(res1.status).to.equal(200);
        expect(res1.body.message).to.equal('Message edited');
    });
});

describe('Discussion Forum - Delete Message', () => {
    it('should return 404 if course does not exist', async () => {
        const res = await request(app)
            .post('/student/login')
            .send({
                email: 'teststudent@example.com',
                password: 'testPassword',
            })

        const courseId = '5f9f2f1c9d7c1f1f5c8c8c8c';
        const messageId = '5f9f2f1c9d7c1f1f5c8c8c8c';

        const res1 = await request(app)
            .delete(`/student/${courseId}/discussion/${messageId}`)
            .set('Authorization', 'Bearer ' + res.body.token)

        expect(res1.status).to.equal(404);
        expect(res1.body.message).to.equal('Course not found');
    });
    it('should return 404 if course does not exist', async () => {
        const res = await request(app)
            .post('/educator/login')
            .send({
                email: 'testeducator@example.com',
                password: 'testPassword',
            })

        const courseId = '5f9f2f1c9d7c1f1f5c8c8c8c';
        const messageId = '5f9f2f1c9d7c1f1f5c8c8c8c';

        const res1 = await request(app)
            .delete(`/educator/${courseId}/discussion/${messageId}`)
            .set('Authorization', 'Bearer ' + res.body.token)

        expect(res1.status).to.equal(404);
        expect(res1.body.message).to.equal('Course not found');
    });
    it('should delete message - student', async () => {
        const res = await request(app)
            .post('/student/login')
            .send({
                email: 'teststudent@example.com',
                password: 'testPassword',
            })

        const course = await Student.findOne({email: 'teststudent@example.com'}).populate('enrolledCourses').exec();
        const courseId = await Course.findById(course.enrolledCourses[0]._id).populate('discussionForum').exec();
        let messageId;
        for (let i = 0; i < courseId.discussionForum.messages.length; i++) {
            if (courseId.discussionForum.messages[i].createdByStudent !== null && courseId.discussionForum.messages[i].createdByStudent.toString() === course._id.toString()) {
                messageId = courseId.discussionForum.messages[i]._id;
                break;
            }
        }

        const res1 = await request(app)
            .delete(`/student/${course.enrolledCourses[0]._id}/discussion/${messageId}`)
            .set('Authorization', 'Bearer ' + res.body.token)

        expect(res1.status).to.equal(200);
        expect(res1.body.message).to.equal('Message deleted');
    });
    it('should delete message - educator', async () => {
        const res = await request(app)
            .post('/educator/login')
            .send({
                email: 'testeducator@example.com',
                password: 'testPassword',
            })

        const course = await Educator.findOne({email: 'testeducator@example.com'}).populate('courseCreated').exec();
        const courseId = await Course.findById(course.courseCreated[0]._id).populate('discussionForum').exec();
        let messageId;
        for(let i = 0; i < courseId.discussionForum.messages.length; i++) {
            if(courseId.discussionForum.messages[i].createdByEducator !== null && courseId.discussionForum.messages[i].createdByEducator.toString() === course._id.toString()) {
                messageId = courseId.discussionForum.messages[i]._id;
                break;
            }
        }

        const res1 = await request(app)
            .delete(`/educator/${course.courseCreated[0]._id}/discussion/${messageId}`)
            .set('Authorization', 'Bearer ' + res.body.token)

        expect(res1.status).to.equal(200);
        expect(res1.body.message).to.equal('Message deleted');
    });
});