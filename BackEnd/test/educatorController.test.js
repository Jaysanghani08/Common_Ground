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
    // await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
});

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
