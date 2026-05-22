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
    });

    it('should not allow invalid token', async () => {

        const response = await request(app)
            .post('/tasks')
            .set('Authorization', 'Bearer invalidTokenHere')
            .send({
                title: 'task with invalid token'
            });

        expect(response.statusCode).toBe(401);

        expect(response.body.sucess).toBe(false);

        expect(response.body.error).toBe('Invalid token.');
    });

    it('should validate task title', async () => {

        const response = await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({});

        expect(response.statusCode).toBe(400);

        expect(response.body.success).toBe(false);

        expect(response.body.error).toBe('Title is required.');
    });

    it('should update a task', async () => {

        const createdTask = await request(app)
            .post('/tasks')
            .set('Authorization', 'Bearer ${token}')
            .send({
                title: 'Old title'
            });

        const taskId = createdTask.body.data.id;

        const response = await request(app)
            .put('/tasks/${taskId}')
            .set('Authorization', 'Bearer ${token}')
            .send({
                title: 'New title',
                completed: true
            });
        
        expect(response.statusCode).toBe(200);

        expect(response.body.sucess).toBe(true);

        expect(response.body.data.title).toBe('New title');

        expect(response.body.data.completed).toBe(true);
    });

    it('should delete a task', async () => {

        const createdTask = await request(app)
            .post('/tasks')
            .set('Authorization', 'Bearer ${token}')
            .send({
                title: 'This task will be deleted soon'
            });

        const taskId = createdTask.body.data.id;

        const response = await request(app)
            .delete('/tasks/${taskId}')
            .set('Authorization', 'Bearer ${token}');

        expect(response.statusCode).toBe(204);
    });
});