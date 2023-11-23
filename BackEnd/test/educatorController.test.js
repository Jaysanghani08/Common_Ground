const mongoose = require('mongoose');
const app = require('../app');
const Student = require('../api/models/student');
const request = require('supertest');
const {expect} = require("chai");
const path = require('path');
const fs = require('fs');

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
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
});

describe('Educator Controller - userSignup', () => {
    it('should create a new educator', async () => {
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

        // Read the profile picture file
        const imagePath = path.join(__dirname, 'images.png'); // Replace with the actual path to your educator's profile picture
        const profilePic = fs.readFileSync(imagePath);

        const res = await request(app)
            .post('/educator/signup')
            .field('fname', testEducator.fname)
            .field('lname', testEducator.lname)
            .field('gender', testEducator.gender)
            .field('dob', testEducator.dob)
            .field('location', testEducator.location)
            .field('username', testEducator.username)
            .field('password', testEducator.password)
            .field('phone', testEducator.phone)
            .field('email', testEducator.email)
            .field('upiID', testEducator.upiID)
            .field('bio', testEducator.bio)
            .attach('profilePic', profilePic, 'profilePic.jpg'); // 'profilePic' is the field name for the file

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
        };

        // Read the profile picture file
        const imagePath = path.join(__dirname, 'images.png'); // Replace with the actual path to your educator's profile picture
        const profilePic = fs.readFileSync(imagePath);

        const res = await request(app)
            .post('/educator/signup')
            .field('fname', educator.fname)
            .field('lname', educator.lname)
            .field('gender', educator.gender)
            .field('dob', educator.dob)
            .field('location', educator.location)
            .field('username', educator.username)
            .field('password', educator.password)
            .field('phone', educator.phone)
            .field('email', educator.email)
            .field('upiID', educator.upiID)
            .field('bio', educator.bio)
            .attach('profilePic', profilePic, 'profilePic.jpg'); // 'profilePic' is the field name for the file

        const res2 = await request(app)
            .post('/educator/signup')
            .field('fname', educator.fname)
            .field('lname', educator.lname)
            .field('gender', educator.gender)
            .field('dob', educator.dob)
            .field('location', educator.location)
            .field('username', educator.username)
            .field('password', educator.password)
            .field('phone', educator.phone)
            .field('email', educator.email)
            .field('upiID', educator.upiID)
            .field('bio', educator.bio)
            .attach('profilePic', profilePic, 'profilePic.jpg'); // 'profilePic' is the field name for the file

        expect(res.statusCode).to.equal(409);
        expect(res.body.message).to.equal('Mail is already in use - Educator');
    });
    it('should not create a new educator with an existing username', async () => {
        const existingEducator = {
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

        // Read the profile picture file
        const imagePath = path.join(__dirname, 'images.png'); // Replace with the actual path to your educator's profile picture
        const profilePic = fs.readFileSync(imagePath);

        // Use the 'attach' method to attach the profile picture to the request
        const res = await request(app)
            .post('/educator/signup')
            .field('fname', existingEducator.fname)
            .field('lname', existingEducator.lname)
            .field('gender', existingEducator.gender)
            .field('dob', existingEducator.dob)
            .field('location', existingEducator.location)
            .field('username', existingEducator.username)
            .field('password', existingEducator.password)
            .field('phone', existingEducator.phone)
            .field('email', existingEducator.email)
            .field('upiID', existingEducator.upiID)
            .field('bio', existingEducator.bio)
            .attach('profilePic', profilePic, 'profilePic.jpg'); // 'profilePic' is the field name for the file

        const newEducator = {
            fname: 'Test',
            lname: 'Educator',
            gender: 'Male',
            dob: '1990-01-01',
            location: 'Test Location',
            username: 'testeducator', // Use the same username as the existing educator
            password: 'testPassword',
            phone: '1234527890',
            email: 'tested2ucator@example.com',
            upiID: 'testUPI@okAxis',
            bio: 'Test bio'
        };

        // Attempt to create a new educator with the same username
        const res2 = await request(app)
            .post('/educator/signup')
            .field('fname', newEducator.fname)
            .field('lname', newEducator.lname)
            .field('gender', newEducator.gender)
            .field('dob', newEducator.dob)
            .field('location', newEducator.location)
            .field('username', newEducator.username)
            .field('password', newEducator.password)
            .field('phone', newEducator.phone)
            .field('email', newEducator.email)
            .field('upiID', newEducator.upiID)
            .field('bio', newEducator.bio)
            .attach('profilePic', profilePic, 'profilePic.jpg'); // 'profilePic' is the field name for the file

        expect(res2.statusCode).to.equal(409);
        expect(res2.body.message).to.equal('Username is already in use - Educator');
    });
    it('should not create a new educator with an existing phone number', async () => {
        const existingEducator = {
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
        };

        // Read the profile picture file
        const imagePath = path.join(__dirname, 'images.png'); // Replace with the actual path to your educator's profile picture
        const profilePic = fs.readFileSync(imagePath);

        // Use the 'attach' method to attach the profile picture to the request
        const res = await request(app)
            .post('/educator/signup')
            .field('fname', existingEducator.fname)
            .field('lname', existingEducator.lname)
            .field('gender', existingEducator.gender)
            .field('dob', existingEducator.dob)
            .field('location', existingEducator.location)
            .field('username', existingEducator.username)
            .field('password', existingEducator.password)
            .field('phone', existingEducator.phone)
            .field('email', existingEducator.email)
            .field('upiID', existingEducator.upiID)
            .field('bio', existingEducator.bio)
            .attach('profilePic', profilePic, 'profilePic.jpg'); // 'profilePic' is the field name for the file

        const newEducator = {
            fname: 'Test',
            lname: 'Educator',
            gender: 'Male',
            dob: '1990-01-01',
            location: 'Test Location',
            username: 'test3educator',
            password: 'testPassword',
            phone: '1234567890', // Use the same phone number as the existing educator
            email: 'test3educator@example.com',
            upiID: 'testUPI@okAxis',
            bio: 'Test bio'
        };

        // Attempt to create a new educator with the same phone number
        const res2 = await request(app)
            .post('/educator/signup')
            .field('fname', newEducator.fname)
            .field('lname', newEducator.lname)
            .field('gender', newEducator.gender)
            .field('dob', newEducator.dob)
            .field('location', newEducator.location)
            .field('username', newEducator.username)
            .field('password', newEducator.password)
            .field('phone', newEducator.phone)
            .field('email', newEducator.email)
            .field('upiID', newEducator.upiID)
            .field('bio', newEducator.bio)
            .attach('profilePic', profilePic, 'profilePic.jpg'); // 'profilePic' is the field name for the file

        expect(res2.statusCode).to.equal(409);
        expect(res2.body.message).to.equal('Phone number is already in use - Educator');
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
