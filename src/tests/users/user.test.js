const request = require('supertest');
const app = require('../../app');

const userEmail = 'user@test.com';
const userPassword = 'strongpassword';

describe('Users', () => {

    it('should register a new user', async () => {

        const response = await request(app)
            .post('/users/register')
            .send({
                email: userEmail,
                password: userPassword
            });
    
        expect(response.statusCode).toBe(201);

        expect(response.body.success).toBe(true);

        expect(response.body.data).toHaveProperty('id');
    });

    it('should login user successfully', async () => {

        const response = await request(app)
            .post('/users/login')
            .send({
                email: userEmail,
                password: userPassword
            });

        expect(response.statusCode).toBe(200);

        expect(response.body.success).toBe(true);

        expect(response.body.data).toHaveProperty('token');
    });
});