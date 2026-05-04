const taskRepository = require('../repositories/taskRepository');

exports.createTask = async (title, userId) => {

    if(!title) {
        throw new Error('Title is required.');
    }

    console.log('User do create task no service:', userId);

    const task = await taskRepository.createTask(title, userId);

    return task; 
}

exports.getTasksByUser = async (userId) => {
    console.log('User do get tasks no service:', userId);
    return await taskRepository.getTasksByUser(userId);
}