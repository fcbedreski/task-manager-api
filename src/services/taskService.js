const taskRepository = require('../repositories/taskRepository');

exports.createTask = async (title, userId) => {

    if(!title) {
        throw new Error('Title is required.');
    }

    const task = await taskRepository.createTask(title, userId);

    return task; 
}