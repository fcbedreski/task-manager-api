const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization; 

    console.log('AUTH HEADER:', req.headers.authorization);

    if(!authHeader) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    const token = authHeader.split(' ')[1];

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log('DECODED:', decoded); // 👈 ADICIONE ISSO

        req.userId = decoded.userId;

        next();

    } catch (err) {
        return res.status(401).json({ error: 'Invalid token.' });
    }
}