const pool = require('../config/db');

exports.createTask = async (title, userId) => {

    console.log('User do create task no repository:', userId);

    const result = await pool.query(
        `INSERT INTO tasks (title, user_id)
        VALUES ($1, $2)
        RETURNING id, title, completed, user_id`,
        [title, userId]
    );

    return result.rows[0];
}

exports.getTasksByUser = async (userId) => {

    console.log('User do get tasks no repository:', userId);

    const result = await pool.query(
        `SELECT id, title, completed, user_id
        FROM tasks
        WHERE user_id = $1
        ORDER BY id DESC`,
        [userId]
    );

    return result.rows;
}