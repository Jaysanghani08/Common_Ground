const mongoose = require('mongoose');
const app = require('../app');
const Student = require('../api/models/student');
const Educator = require('../api/models/educator');
const Course = require('../api/models/course');
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

        const imagePath = path.join(__dirname, 'images.png'); // Replace with the actual path to your educator's profile picture
        const profilePic = fs.readFileSync(imagePath);

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
            .field('title', post.title)
            .field('body', post.body)
            .attach('attachments', profilePic, 'profilePic.png');

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
        const imagePath = path.join(__dirname, 'images.png'); // Replace with the actual path to your educator's profile picture
        const profilePic = fs.readFileSync(imagePath);

        const res = await request(app)
            .post('/educator/login')
            .send(educator1)

        const educator = await Educator.findOne({email: 'testeducator@example.com'}).exec();
        const course = await Course.findOne({_id: educator.courseCreated[0]}).populate('courseSections').exec();
        const res1 = await request(app)
            .patch(`/educator/edit-post/${course._id}/${course.courseSections[0]._id}/${course.courseSections[0].posts[0]._id}`)
            .set('Authorization', 'Bearer ' + res.body.token)
            .field('title', post.title)
            .field('body', post.body)
            .attach('attachments', profilePic, 'profilePic.png');

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