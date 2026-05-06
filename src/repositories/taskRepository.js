const pool = require('../config/db');

exports.createTask = async (title, userId) => {

    const result = await pool.query(
        `INSERT INTO tasks (title, user_id)
        VALUES ($1, $2)
        RETURNING id, title, completed, user_id`,
        [title, userId]
    );

    return result.rows[0];
}

exports.getTasksByUser = async (userId) => {

    const result = await pool.query(
        `SELECT id, title, completed, user_id
        FROM tasks
        WHERE user_id = $1
        ORDER BY id DESC`,
        [userId]
    );

    return result.rows;
}

exports.updateTask = async (id, title, completed, userId) => {

    const result = await pool.query(
        `UPDATE tasks
        SET title = $1,
            completed = $2
        WHERE id = $3 AND user_id = $4
        RETURNING id, title, completed, user_id`,
        [title, completed, id, userId]
    );

    return result.rows[0];
}

exports.deleteTask = async (id, userId) => {

    const result = await pool.query(
        `DELETE
        FROM tasks
        WHERE id = $1 AND user_id = $2
        RETURNING id`,
        [id, userId]
    );

    return result.rows[0];
}