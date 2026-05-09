const request = require('supertest');
const app = require('../../app');

let token;

describe('Tasks', () => {

    beforeAll(async () => {

        await request(app)
            .post('/users/register')
            .send({
                email: 'test@email.com',
                password: 'strongpassword'
            });

        const loginResponse = await request(app)
            .post('/users/login')
            .send({
                email: 'test@email.com',
                password: 'strongpassword'
            });

        token = loginResponse.body.data.token;
    });

    it('should create a task', async () => {

        const response = await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Study for masters'
            });

        expect(response.statusCode).toBe(201);

        expect(response.body.success).toBe(true);

        expect(response.body.data.title).toBe('Study for masters');
    });
});