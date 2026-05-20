const request = require('supertest');
const app = require('../../app');

const userEmail = 'user@test.com';
const userPassword = 'strongpassword';
const duplicatedEmail = 'duplicated@email.com';
const duplicatedPassword = 'password';

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

    it('should not register duplicated email', async () => {

        await request(app)
            .post('/users/register')
            .send({
                email: duplicatedEmail,
                password: duplicatedPassword
            });

        const response = await request(app)
            .post('/users/register')
            .send({
                email: duplicatedEmail,
                password: duplicatedPassword
            });

        expect(response.statusCode).toBe(409);

        expect(response.body.sucess).toBe(false);

        expect(response.body.error).toBe('Email already registered.');
    });
});