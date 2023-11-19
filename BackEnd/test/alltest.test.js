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

// Educator
describe('Educator Controller - userSignup', () => {
    it('should create a new educator', async () => {
        const educator = {
            fname: 'Test',
            lname: 'Educator',
            gender: 'Male',
            dob: '1990-01-01',
            location: 'Test Location',
            username: 'testeducator',
            password: 'testPassword',
            phone: '1234567890',
            email: 'testeducator@example.com',
            upiID: 'testUPI@okAxis',
            bio: 'Test bio'
        }

        const res = await request(app)
            .post('/educator/signup')
            .send(educator);

        expect(res.statusCode).to.equal(201);
        expect(res.body.message).to.equal('Educator created');
    });
    it('should not create a new educator with an existing email', async () => {
        const educator = {
            fname: 'Test',
            lname: 'Educator',
            gender: 'Male',
            dob: '1990-01-01',
            location: 'Test Location',
            username: 'testeducator',
            password: 'testPassword',
            phone: '1234567890',
            email: 'testeducator@example.com',
            upiID: 'testUPI@okAxis',
            bio: 'Test bio'
        }

        const res = await request(app)
            .post('/educator/signup')
            .send(educator);

        const res2 = await request(app)
            .post('/educator/signup')
            .send(educator);

        expect(res.statusCode).to.equal(409);
        expect(res.body.message).to.equal('Mail is already in use - Educator');
    });
    it('should not create a new educator with an existing username', async () => {
        const educator2 = {
            fname: 'Test',
            lname: 'Educator',
            gender: 'Male',
            dob: '1990-01-01',
            location: 'Test Location',
            username: 'testeducator',
            password: 'testPassword',
            phone: '1234527890',
            email: 'tested2ucator@example.com',
            upiID: 'testUPI@okAxis',
            bio: 'Test bio'
        }
        const res2 = await request(app)
            .post('/educator/signup')
            .send(educator2);

        expect(res2.statusCode).to.equal(409);
        expect(res2.body.message).to.equal('Username is already in use - Educator');
    });
    it('should not create a new educator with an existing phone number', async () => {
        const educator = {
            fname: 'Test',
            lname: 'Educator',
            gender: 'Male',
            dob: '1990-01-01',
            location: 'Test Location',
            username: 'test2educator',
            password: 'testPassword',
            phone: '1234567890',
            email: 'teste2ducator@example.com',
            upiID: 'testUPI@okAxis',
            bio: 'Test bio'
        }

        const res = await request(app)
            .post('/educator/signup')
            .send(educator);

        expect(res.statusCode).to.equal(409);
        expect(res.body.message).to.equal('Phone number is already in use - Educator');
    });
});

describe('Educator Controller - userLogin', () => {
    it('should login an existing educator', async () => {
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
    });
    it('should not login an educator with the wrong password', async () => {
        const educator = {
            email: 'testeducator@example.com',
            password: 'wrongPassword'
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator);

        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Wrong Password - Educator');
    });
    it('should not login an educator with the wrong email', async () => {
        const educator = {
            email: 'tested@example.com',
            password: 'testPassword'
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator);

        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('User does not exist - Educator');
    });
});

describe('Educator Controller - userEdit', () => {
    it('should userId from jwt as student exists', async () => {
        const editRes = await request(app)
            .patch('/educator/edit-profile')
            .set('Authorization', 'Bearer ' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MDAyOTk0NjksImV4cCI6MTczMTgzNTQ2OSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInVzZXJJZCI6IjkzODkzNDg5Mzg5MzUzNDA1MzQifQ.NdhN2vzwVFjnhVhjI-s5z-EL2ZrhMfEmhDcfSbk_YDA")
            .send({
                fname: 'EditedTest',
            });

        expect(editRes.status).to.equal(401);
        expect(editRes.body.message).to.equal('Invalid token');
    });
    it('should edit a educator', async () => {
        const loginRes = await request(app)
            .post('/educator/login')
            .send({
                email: 'testeducator@example.com',
                password: 'testPassword',
            });

        // Edit the student profile without changing the profile picture
        const editRes = await request(app)
            .patch('/educator/edit-profile')
            .set('Authorization', 'Bearer ' + loginRes.body.token)
            .send({
                fname: 'JaySabva',
            });

        expect(editRes.status).to.equal(200);
        expect(editRes.body.message).to.equal('Educator updated');
    });
    it('should handle errors during profile editing', async () => {
        // Force an error during profile editing
        const editRes = await request(app)
            .patch('/educator/edit')
            .set('Authorization', 'Bearer ' + 'invalidtoken')
            .send({
                fname: 'EditedTest',
            });

        expect(editRes.status).to.equal(404);
        expect(editRes.body).to.have.property('error');
    });
});

describe('Educator Controller - userDelete', () => {
    it('should delete a educator', async () => {
        const loginRes = await request(app)
            .post('/educator/login')
            .send({
                email: 'testeducator@example.com',
                password: 'testPassword',
            });
        const deleteRes = await request(app)
            .delete('/educator/testeducator@example.com')
            .set('Authorization', 'Bearer ' + loginRes.body.token);

        expect(deleteRes.status).to.equal(200);
        expect(deleteRes.body.message).to.equal('Educator deleted');
    });
    it('should return 404 if educator does not exist', async () => {
        const testEducator = {
            fname: 'Test',
            lname: 'Educator',
            gender: 'Male',
            dob: '1990-01-01',
            location: 'Test Location',
            username: 'testeducator',
            password: 'testPassword',
            phone: '1234567890',
            email: 'testeducator@example.com',
            upiID: 'testUPI@okAxis',
            bio: 'Test bio'
        };

        const res = await request(app)
            .post('/educator/signup')
            .send(testEducator);

        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('Educator created');

        const loginRes = await request(app)
            .post('/educator/login')
            .send({
                email: 'testeducator@example.com',
                password: 'testPassword',
            });

        const deleteRes = await request(app)
            .delete('/educator/testeducator@example.com')
            .set('Authorization', 'Bearer ' + loginRes.body.token);

        const deleteRes2 = await request(app)
            .delete('/educator/testeducator@example.com')
            .set('Authorization', 'Bearer ' + loginRes.body.token);

        expect(deleteRes2.status).to.equal(404);
        expect(deleteRes2.body.message).to.equal('Educator not found');
    });
});
describe('Educator Controller - resetPassword', () => {
    it('should reset password', async () => {
        const testEducator = {
            fname: 'Test',
            lname: 'Educator',
            gender: 'Male',
            dob: '1990-01-01',
            location: 'Test Location',
            username: 'testeducator',
            password: 'testPassword',
            phone: '1234567890',
            email: 'testeducator@example.com',
            upiID: 'testUPI@okAxis',
            bio: 'Test bio'
        };

        const res = await request(app)
            .post('/educator/signup')
            .send(testEducator);

        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('Educator created');

        const resEmail = await request(app).post('/educator/reset-password')
            .send({
                email: 'testeducator@example.com',
            });

        expect(resEmail.status).to.equal(200);
        expect(resEmail.body.message).to.equal('Email sent successfully');
    });

    it('should return 404 if educator does not exist', async () => {
        const resEmail = await request(app).post('/educator/reset-password')
            .send({
                email: 'testeducator@example1.com'
            });

        expect(resEmail.status).to.equal(404);
        expect(resEmail.body.message).to.equal('User not found - Educator');
    });
});

describe('Educator Controller - updatePassword', () => {
    it('should not update password if token is invalid', async () => {
        const resEmail = await request(app).post('/educator/update-password')
            .send({
                email: 'testeducator@example.com'
            });

        expect(resEmail.status).to.equal(404);
        expect(resEmail.body.message).to.equal('Token not found - Educator');
    });

    it('should return 404 if educator does not exist', async () => {
        const resEmail = await request(app).post('/educator/update-password')
            .send({
                email: 'testeducator@example1.com'
            });

        expect(resEmail.status).to.equal(404);
        expect(resEmail.body.message).to.equal('User not found - Educator');
    });
});

// Course
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

        const res2 = await request(app)
            .post('/educator/create-course')
            .set('Authorization', 'Bearer ' + res.body.token)
            .send(course);

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

        const res2 = await request(app)
            .patch(`/educator/edit-course/${courseId}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send(courseEdit);

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

// Section
describe('Section Controller - createSection', () => {
    it('should create a new section', async () => {
        const educator1 = {
            email: 'testeducator@example.com',
            password: 'testPassword',
        }
        const educator = await Educator.findOne({email: 'testeducator@example.com'}).exec();

        const res = await request(app)
            .post('/educator/login')
            .send(educator1)

        const res1 = await request(app)
            .post(`/educator/create-section/${educator.courseCreated[0]}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send({
                title: 'testSection',
            })

        expect(res1.statusCode).to.equal(201);
        expect(res1.body.message).to.equal('Section created');
    });
    it('should not create a new section if course does not exist', async () => {
        const educator1 = {
            email: 'testeducator@example.com',
            password: 'testPassword',
        }
        const educator = await Educator.findOne({email: 'testeducator@example.com'}).exec();

        const res = await request(app)
            .post('/educator/login')
            .send(educator1)

        const res1 = await request(app)
            .post(`/educator/create-section/123456789012345678901234`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send({
                title: 'testSection',
            })

        expect(res1.statusCode).to.equal(404);
        expect(res1.body.message).to.equal('Course not found');
    });
    it('should not create a new section if user is not the creator of the course', async () => {
        const educator1 = {
            email: 'testeduc1ator@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator1)

        const educator = await Educator.findOne({email: 'testeducator@example.com'}).exec();

        const res1 = await request(app)
            .post(`/educator/create-section/${educator.courseCreated[0]}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send({
                title: 'testSection',
            })

        expect(res1.statusCode).to.equal(401);
        expect(res1.body.message).to.equal('Unauthorized');
    });
});

describe('Section Controller - editSection', () => {
    it('should edit a section', async () => {
        const educator1 = {
            email: 'testeducator@example.com',
            password: 'testPassword',
        };
        const educator = await Educator.findOne({email: 'testeducator@example.com'}).populate('courseCreated').exec();
        const res = await request(app)
            .post('/educator/login')
            .send(educator1)

        const res1 = await request(app)
            .patch(`/educator/edit-section/${educator.courseCreated[0]._id}/${educator.courseCreated[0].courseSections[0]._id}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send({
                title: 'editedSection',
            })

        expect(res1.statusCode).to.equal(201);
        expect(res1.body.message).to.equal('Section edited');
        expect(res1.body).to.have.property('section');
    });
    it('should not edit a section if course does not exist', async () => {
        const educator1 = {
            email: 'testeducator@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator1)

        const res1 = await request(app)
            .patch(`/educator/edit-section/123456789012345678901234/123456789012345678901234`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send({
                title: 'editedSection',
            })

        expect(res1.statusCode).to.equal(404);
        expect(res1.body.message).to.equal('Course not found');
    });
    it('should not edit if section does not exist', async () => {
        const educator1 = {
            email: 'testeducator@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator1)

        const educator = await Educator.findOne({email: 'testeducator@example.com'}).populate('courseCreated').exec();
        const res1 = await request(app)
            .patch(`/educator/edit-section/${educator.courseCreated[0]._id}/123456789012345678901234`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send({
                title: 'editedSection',
            })

        expect(res1.statusCode).to.equal(404);
        expect(res1.body.message).to.equal('Section not found');
    });
    it('should not edit a section if user is not the creator of the course', async () => {
        const educator1 = {
            email: 'testeduc1ator@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator1)

        const educator = await Educator.findOne({email: 'testeducator@example.com'}).populate('courseCreated').exec();
        const res1 = await request(app)
            .patch(`/educator/edit-section/${educator.courseCreated[0]._id}/${educator.courseCreated[0].courseSections[0]._id}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send({
                title: 'editedSection',
            })

        expect(res1.statusCode).to.equal(401);
        expect(res1.body.message).to.equal('Unauthorized');
    });
});
describe('Section Controller - deleteSection', () => {
    it('should delete a section', async () => {
        const educator1 = {
            email: 'testeducator@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator1)

        const educator = await Educator.findOne({email: 'testeducator@example.com'}).populate('courseCreated').exec();
        const res1 = await request(app)
            .delete(`/educator/delete-section/${educator.courseCreated[0]._id}/${educator.courseCreated[0].courseSections[0]._id}`)
            .set('Authorization', 'Bearer ' + res.body.token)

        expect(res1.statusCode).to.equal(201);
        expect(res1.body.message).to.equal('Section deleted');
    });
    it('should not delete a section if course does not exist', async () => {
        const educator1 = {
            email: 'testeducator@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator1)

        const res1 = await request(app)
            .delete(`/educator/delete-section/123456789012345678901234/123456789012345678901234`)
            .set('Authorization', 'Bearer ' + res.body.token)

        expect(res1.statusCode).to.equal(404);
        expect(res1.body.message).to.equal('Course not found');
    });
    it('should not delete a section if section does not exist', async () => {
        const educator1 = {
            email: 'testeducator@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator1)

        const educator = await Educator.findOne({email: 'testeducator@example.com'}).populate('courseCreated').exec();

        const res1 = await request(app)
            .delete(`/educator/delete-section/${educator.courseCreated[0]._id}/123456789012345678901234`)
            .set('Authorization', 'Bearer ' + res.body.token)

        expect(res1.statusCode).to.equal(404);
        expect(res1.body.message).to.equal('Section not found');
    });
    it('should not delete a section if user is not the creator of the course', async () => {
        const educator1 = {
            email: 'testeduc1ator@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator1)

        const educator = await Educator.findOne({email: 'testeducator@example.com'}).populate('courseCreated').exec()
        const res1 = await request(app)
            .delete(`/educator/delete-section/${educator.courseCreated[0]._id}/${educator.courseCreated[0].courseSections[0]}`)
            .set('Authorization', 'Bearer ' + res.body.token)

        expect(res1.statusCode).to.equal(401);
        expect(res1.body.message).to.equal('Unauthorized');
    });
});

describe('Section Controller - addPost', () => {
    it('should add a post to a section', async () => {
        const educator1 = {
            email: 'testeducator@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator1)

        let educator = await Educator.findOne({email: 'testeducator@example.com'}).populate('courseCreated').exec();

        const res2 = await request(app)
            .post(`/educator/create-section/${educator.courseCreated[0]._id}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send({
                title: 'testSection',
            })

        const post = {
            title: 'testPost',
            body: 'testContent',
        }

        educator = await Educator.findOne({email: 'testeducator@example.com'}).populate('courseCreated').exec();

        const res1 = await request(app)
            .post(`/educator/add-post/${educator.courseCreated[0]._id}/${educator.courseCreated[0].courseSections[0]}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send(post);

        expect(res1.statusCode).to.equal(201);
        expect(res1.body.message).to.equal('Post added');
    });
    it('should not add a post to a section if course does not exist', async () => {
        const educator1 = {
            email: 'testeducator@example.com',
            password: 'testPassword',
        };
        const post = {
            title: 'testPost',
            body: 'testContent',
        }
        const res = await request(app)
            .post('/educator/login')
            .send(educator1)

        const res1 = await request(app)
            .post(`/educator/add-post/123456789012345678901234/123456789012345678901234`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send(post);

        expect(res1.statusCode).to.equal(404);
        expect(res1.body.message).to.equal('Course not found');
    });
    it('should not add a post to a section if section does not exist', async () => {
        const educator1 = {
            email: 'testeducator@example.com',
            password: 'testPassword',
        };
        const post = {
            title: 'testPost',
            body: 'testContent',
        }
        const res = await request(app)
            .post('/educator/login')
            .send(educator1)

        const educator = await Educator.findOne({email: 'testeducator@example.com'}).populate('courseCreated').exec();
        const res1 = await request(app)
            .post(`/educator/add-post/${educator.courseCreated[0]._id}/123456789012345678901234`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send(post);

        expect(res1.statusCode).to.equal(404);
        expect(res1.body.message).to.equal('Section not found');
    });
    it('should not add a post to a section if user is not the creator of the course', async () => {
        const educator1 = {
            email: 'testeduc1ator@example.com',
            password: 'testPassword',
        };
        const post = {
            title: 'testPost',
            body: 'testContent',
        }
        const res = await request(app)
            .post('/educator/login')
            .send(educator1)

        const educator = await Educator.findOne({email: 'testeducator@example.com'}).populate('courseCreated').exec();
        const res1 = await request(app)
            .post(`/educator/add-post/${educator.courseCreated[0]._id}/${educator.courseCreated[0].courseSections[0]._id}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send(post);

        expect(res1.statusCode).to.equal(401);
        expect(res1.body.message).to.equal('Unauthorized');
    });
});

describe('Section Controller - editPost', () => {
    it('should edit a post in a section', async () => {
        const educator1 = {
            email: 'testeducator@example.com',
            password: 'testPassword',
        };
        const post = {
            title: 'testPost',
            body: 'testContent',
        }
        const res = await request(app)
            .post('/educator/login')
            .send(educator1)

        const educator = await Educator.findOne({email: 'testeducator@example.com'}).exec();
        const course = await Course.findOne({_id: educator.courseCreated[0]}).populate('courseSections').exec();
        const res1 = await request(app)
            .patch(`/educator/edit-post/${course._id}/${course.courseSections[0]._id}/${course.courseSections[0].posts[0]._id}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send(post);

        expect(res1.statusCode).to.equal(200);
        expect(res1.body.message).to.equal('Post edited');
    });
    it('should not edit a post in a section if course does not exist', async () => {
        const educator1 = {
            email: 'testeducator@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator1)

        const educator = await Educator.findOne({email: 'testeducator@example.com'}).exec();
        const course = await Course.findOne({_id: educator.courseCreated[0]}).populate('courseSections').exec();

        const post = {
            title: 'testPost1',
            body: 'testContent1',
        }
        const res1 = await request(app)
            .patch('/educator/edit-post/123456789012345678901234/123456789012345678901234/123456789012345678901234')
            .set('Authorization', 'Bearer ' + res.body.token)
            .send(post);

        expect(res1.statusCode).to.equal(404);
        expect(res1.body.message).to.equal('Course not found');
    });
    it('should not edit a post in a section if section does not exist', async () => {
        const educator1 = {
            email: 'testeducator@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator1)

        const educator = await Educator.findOne({email: 'testeducator@example.com'}).exec();
        const course = await Course.findOne({_id: educator.courseCreated[0]}).populate('courseSections').exec();

        const post = {
            title: 'testPost1',
            body: 'testContent1',
        }

        const res1 = await request(app)
            .patch(`/educator/edit-post/${course._id}/123456789012345678901234/123456789012345678901234`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send(post);

        expect(res1.statusCode).to.equal(404);
        expect(res1.body.message).to.equal('Section not found');
    });
    it('should not edit a post in a section if post does not exist', async () => {
        const educator1 = {
            email: 'testeducator@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator1)

        const educator = await Educator.findOne({email: 'testeducator@example.com'}).exec();
        const course = await Course.findOne({_id: educator.courseCreated[0]}).populate('courseSections').exec();

        const post = {
            title: 'testPost1',
            body: 'testContent1',
        }

        const res1 = await request(app)
            .patch(`/educator/edit-post/${course._id}/${course.courseSections[0]._id}/123456789012345678901234`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send(post);

        expect(res1.statusCode).to.equal(404);
        expect(res1.body.message).to.equal('Post not found');
    });
    it('should not edit a post in a section if user is not the creator of the course', async () => {
        const educator1 = {
            email: 'testeduc1ator@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator1)

        const educator = await Educator.findOne({email: 'testeducator@example.com'}).exec();
        const course = await Course.findOne({_id: educator.courseCreated[0]}).populate('courseSections').exec();

        const post = {
            title: 'testPost1',
            body: 'testContent1',
        }

        const res1 = await request(app)
            .patch(`/educator/edit-post/${course._id}/${course.courseSections[0]._id}/${course.courseSections[0].posts[0]._id}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .send(post);

        expect(res1.statusCode).to.equal(401);
        expect(res1.body.message).to.equal('Unauthorized');
    });
});

describe('Section Controller - deletePost', () => {
    it('should not delete a post in a section if course does not exist', async () => {
        const educator1 = {
            email: 'testeducator@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator1)

        const res1 = await request(app)
            .delete(`/educator/delete-post/123456789012345678901234/123456789012345678901234/123456789012345678901234`)
            .set('Authorization', 'Bearer ' + res.body.token)

        expect(res1.statusCode).to.equal(404);
        expect(res1.body.message).to.equal('Course not found');
    });
    it('should not delete a post in a section if section does not exist', async () => {
        const educator1 = {
            email: 'testeducator@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator1)

        const educator = await Educator.findOne({email: 'testeducator@example.com'}).exec();
        const course = await Course.findOne({_id: educator.courseCreated[0]}).populate('courseSections').exec();

        const res1 = await request(app)
            .delete(`/educator/delete-post/${course._id}/123456789012345678901234/123456789012345678901234`)
            .set('Authorization', 'Bearer ' + res.body.token)

        expect(res1.statusCode).to.equal(404);
        expect(res1.body.message).to.equal('Section not found');
    });
    it('should not delete a post in a section if post does not exist', async () => {
        const educator1 = {
            email: 'testeducator@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator1)
        const educator = await Educator.findOne({email: 'testeducator@example.com'}).exec();
        const course = await Course.findOne({_id: educator.courseCreated[0]}).populate('courseSections').exec();

        const res1 = await request(app)
            .delete(`/educator/delete-post/${course._id}/${course.courseSections[0]._id}/123456789012345678901234`)
            .set('Authorization', 'Bearer ' + res.body.token)

        expect(res1.statusCode).to.equal(404);
        expect(res1.body.message).to.equal('Post not found');
    });
    it('should not delete a post in a section if user is not the creator of the course', async () => {
        const educator1 = {
            email: 'testeduc1ator@example.com',
            password: 'testPassword',
        };

        const res = await request(app)
            .post('/educator/login')
            .send(educator1)
        const educator = await Educator.findOne({email: 'testeducator@example.com'}).exec();
        const course = await Course.findOne({_id: educator.courseCreated[0]}).populate('courseSections').exec();

        const res1 = await request(app)
            .delete(`/educator/delete-post/${course._id}/${course.courseSections[0]._id}/${course.courseSections[0].posts[0]._id}`)
            .set('Authorization', 'Bearer ' + res.body.token)

        expect(res1.statusCode).to.equal(401);
        expect(res1.body.message).to.equal('Unauthorized');
    });
    it('should delete a post in a section', async () => {
        const educator1 = {
            email: 'testeducator@example.com',
            password: 'testPassword',
        };

        const educator = await Educator.findOne({email: 'testeducator@example.com'}).exec();
        const course = await Course.findOne({_id: educator.courseCreated[0]}).populate('courseSections').exec();
        const res = await request(app)
            .post('/educator/login')
            .send(educator1)

        const res1 = await request(app)
            .delete(`/educator/delete-post/${course._id}/${course.courseSections[0]._id}/${course.courseSections[0].posts[0]._id}`)
            .set('Authorization', 'Bearer ' + res.body.token)

        expect(res1.statusCode).to.equal(200);
        expect(res1.body.message).to.equal('Post deleted');
    });
});