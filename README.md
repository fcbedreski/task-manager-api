# Task manager API

This is a REST API for task management, build with Node.js, Express and PostgreSQL.

The project was created to practice backend arquitecture, JWT authentication,
authorization, SQL persistence and automated testing.

## Features

- User registration
- User login with auth using JWT
- Protected routes with middleware
- CRUD operations for tasks
- Ownership-based authorization
- PostgreSQL persistence
- Layered architecture
- Centralized error handling
- Automated tests with Jest and Supertest

## Tech stack

- Node.js (v24.13.0)
- Express (v5.2.1)
- PostgreSQL (v8.20.0)
- JWT (v9.0.3)
- bcrypt (v6.0.0)
- Jest (v30.4.2)
- Supertest (v7.2.2)

## Architecture

This project follows a layered architecture

- Controllers ~> HTTP flow
- Services ~> Business rules
- Repositories ~> Database access
- Middlewares ~> Authentication and error handling

## Project structure

```plaintext
src/
├── config/
├── controllers/
├── errors/
├── middlewares/
├── repositories/
├── routes/
├── services/
├── tests/
├── app.js
└── server.js
```

## How to setup this project

```bash
git clone https://github.com/fcbedreski/task-manager-api.git

cd task-manager-api

npm install
```

## ENV variables

Create a new `.env` file:

```env
PORT=3000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
```

This project used OpenSSL to generate a secret key. Feel free to try another secure methods! 

## How to run this project

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

## How to run tests

This command will run all tests together:

```bash
npm test
```

## API endpoints

### Users

- POST /users/register
- POST /users/login

### Tasks

- GET /tasks
- POST /tasks
- PUT /tasks/:id
- DELETE /tasks/:id

## About the authentication

Protected routes require a JWT token:

```http
Authorization: Bearer YOUR_TOKEN
```

## Future Improvements

- Add request validation with Zod
- Add Swagger/OpenAPI documentation
- Dockerize application and database
- Add refresh token authentication flow
- Improve test coverage
- Add CI/CD pipeline with GitHub Actions
- Migrate project to TypeScript

## Lessons Learned

This project helped me practice:

- REST API design
- JWT authentication
- Authorization by ownership
- SQL queries with PostgreSQL
- Layered backend architecture
- Automated integration testing
- Error handling patterns

Feel free to give me suggestions about how to improve this project or to use this project for learning purposes.  
See ya! :sparkles: