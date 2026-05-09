const request = require('supertest');
const app = require('../../app');

describe('Users', () => {

    it('should register a new user', async () => {

        const response = await request(app)
            .post('/users/register')
            .send({
                email: 'test@email.com',
                password: 'strongpassword'
            });
    
        expect(response.statusCode).toBe(201);

        expect(response.body.success).toBe(true);

        expect(response.body.data).toHaveProperty('id');
    });

    it('should login user successfully', async () => {

        const response = await request(app)
            .post('/users/login')
            .send({
                email: 'test@email.com',
                password: 'strongpassword'
            });

        expect(response.statusCode).toBe(200);

        expect(response.body.success).toBe(true);

        expect(response.body.data).toHaveProperty('token');
    });
});