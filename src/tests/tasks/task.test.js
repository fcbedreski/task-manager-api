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
});