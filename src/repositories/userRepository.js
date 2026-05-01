const pool = require('../config/db');

exports.createUser = async (email, password) => {

    const result = await pool.query(
        'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
        [email, password]
    );

    return result.rows[0];
};
