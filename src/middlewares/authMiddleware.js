const jwt = require('jsonwebtoken');
const AppError = require('../errors/AppError');

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization; 

    if(!authHeader) {
        return next(new AppError('Token not provided.', 401));
    }

    const token = authHeader.split(' ')[1];

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.userId;

        next();

    } catch (err) {
        return next(new AppError('Invalid token.', 401));
    }
}