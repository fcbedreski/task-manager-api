const request = require('supertest');
const app = require('../../app');

let token;
const userEmail = 'user@test.com';
const userPassword = 'strongpassword';
const taskTitle = 'Study for masters';

describe('Tasks', () => {

    beforeAll(async () => {

        await request(app)
            .post('/users/register')
            .send({
                email: userEmail,
                password: userPassword
            });

        const loginResponse = await request(app)
            .post('/users/login')
            .send({
                email: userEmail,
                password: userPassword
            });

        token = loginResponse.body.data.token;
    });

    it('should create a task', async () => {

        const response = await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: taskTitle
            });

        expect(response.statusCode).toBe(201);

        expect(response.body.success).toBe(true);

        expect(response.body.data.title).toBe('Study for masters');
    });

    it('should not create task without user token', async () => {

        const response = await request(app)
            .post('/tasks')
            .send({
                title: 'new task without token'
            });

        expect(response.statusCode).toBe(401);

        expect(response.body.success).toBe(false);

        expect(response.body.error).toBe('Token not provided.');
    })
});