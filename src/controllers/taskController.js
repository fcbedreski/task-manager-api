const taskService = require('../services/taskService');

exports.create = async (req, res) => {

    const { title } = req.body;
    const userId = req.userId;

    try {
        
        const task = await taskService.createTask(title, userId);
        res.status(201).json({
            success: true,
            data: task
        });

    } catch (err) {
        next(err);
    }
}

exports.getAll = async (req, res) => {

    const userId = req.userId;

    try {
        const tasks = await taskService.getTasksByUser(userId);
        res.json(tasks);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.update = async (req, res) => {

    const { id } = req.params;
    const { title, completed } = req.body; 
    const userId = req.userId;

    try {
        const task = await taskService.updateTask(
            id,
            title,
            completed,
            userId
        );

        res.json(task);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.delete = async (req, res) => {

    const { id } = req.params;
    const userId = req.userId;

    try {

        await taskService.deleteTask(id, userId);
        res.status(204).send();

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}