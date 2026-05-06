const taskRepository = require('../repositories/taskRepository');

exports.createTask = async (title, userId) => {

    if(!title) {
        throw new Error('Title is required.');
    }

    const task = await taskRepository.createTask(title, userId);

    return task; 
}

exports.getTasksByUser = async (userId) => {
    return await taskRepository.getTasksByUser(userId);
}

exports.updateTask = async (id, title, completed, userId) => {

    if(!title) {
        throw new Error('Title is required.');
    }

    const task = await taskRepository.updateTask(id, title, completed, userId);

    if(!task) {
        throw new Error('Task not found or not authorized.');
    }

    return task; 
}

exports.deleteTask = async (id, userId) => {

    const deletedTask = await taskRepository.deleteTask(id, userId);

    if(!deletedTask) {
        throw new Error('Task not found or not authorized.');
    }

    return deletedTask; 
}