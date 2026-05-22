const request = require('supertest');
const app = require('../../app');

const userEmail = 'user@test.com';
const userPassword = 'strongpassword';
const duplicatedEmail = 'duplicated@email.com';
const duplicatedPassword = 'password';
const wrongPassEmail = 'wrongpassword@gmail.com';
const wrongPassPassword = '123456';

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

        expect(response.body.success).toBe(false);

        expect(response.body.error).toBe('Email already registered.');
    });

    it('should not login with wrong password', async () => {

        await request(app)
            .post('/users/register')
            .send({
                email: wrongPassEmail,
                password: wrongPassPassword
            });

        const response = await request(app)
            .post('/users/login')
            .send({
                email: wrongPassEmail,
                password: 'anotherpassword'
            });

        expect(response.statusCode).toBe(401);

        expect(response.body.success).toBe(false);

        expect(response.body.error).toBe('Invalid credentials.');
    });

    it('should validate required fields on register', async () => {

        const response = await request(app)
            .post('/users/register')
            .send({});
        
        expect(response.statusCode).toBe(400);

        expect(response.body.success).toBe(false);

        expect(response.body.error).toBe('Email and password are required.');
    });

    it('should validate required fields on login', async () => {

        const response = await request(app)
            .post('/users/login')
            .send({});
        
        expect(response.statusCode).toBe(400);

        expect(response.body.success).toBe(false);
    });
});