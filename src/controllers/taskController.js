const taskService = require('../services/taskService');

exports.create = async (req, res) => {

    const { title } = req.body;
    const { userId } = req.userId;

    console.log('CREATE TOKEN:', req.headers.authorization);

    try {
        
        const task = await taskService.createTask(title, userId);
        res.status(201).json(task);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.getAll = async (req, res) => {

    const userId = req.userId;

    console.log('GET TOKEN:', req.headers.authorization);

    try {
        const tasks = await taskService.getTasksByUser(userId);
        res.json(tasks);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}