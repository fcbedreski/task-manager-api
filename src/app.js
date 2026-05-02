require('dotenv').config();

const express = require('express');
const userRoutes = require('./routes/userRoutes');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(express.json());
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.send('API is running');
})

module.exports = app; 