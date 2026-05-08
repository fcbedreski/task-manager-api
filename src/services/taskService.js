const taskRepository = require('../repositories/taskRepository');
const appError = require('../errors/AppError');
const AppError = require('../errors/AppError');

exports.createTask = async (title, userId) => {

    if(!title) {
        throw new AppError('Title is required.', 400); 
    }

    const task = await taskRepository.createTask(title, userId);

    return task; 
}

exports.getTasksByUser = async (userId) => {
    return await taskRepository.getTasksByUser(userId);
}

exports.updateTask = async (id, title, completed, userId) => {

    if(!id || isNaN(Number(id))) {
        throw new AppError('Invalid task ID.', 400);
    }

    if(!title) {
        throw new AppError('Title is required.', 400);
    }

    const task = await taskRepository.updateTask(id, title, completed, userId);

    if(!task) {
        throw new AppError('Task not found or not authorized.', 404);
    }

    return task; 
}

exports.deleteTask = async (id, userId) => {

    if(!id || isNaN(Number(id))) {
        throw new AppError('Invalid task ID.', 400);
    }

    const deletedTask = await taskRepository.deleteTask(id, userId);

    if(!deletedTask) {
        throw new AppError('Task not found or not authorized.', 401);
    }

    return deletedTask; 
}