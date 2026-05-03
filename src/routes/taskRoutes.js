const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, taskController.create);
router.get('/', authMiddleware, taskController.getAll); 

module.exports = router; 