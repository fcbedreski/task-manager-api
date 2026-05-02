const taskService = require('../services/taskService');

exports.create = async (req, res) => {

    const { title } = req.body;
    const { userId } = req.userId;

    try {
        
        const task = await taskService.createTask(title, userId);
        res.status(201).json(task);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}