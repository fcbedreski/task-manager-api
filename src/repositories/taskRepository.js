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