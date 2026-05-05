require('dotenv').config();

const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use(express.json());
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.send('API is running');
})

module.exports = app; 