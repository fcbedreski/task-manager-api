const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

exports.register = async (email, password) => {

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.createUser(email, hashedPassword);

    return user;
}

exports.login = async (email, password) => {

    const user = users.find(u => u.email === email);

    if(!user) {
        throw new Error('User not found!');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        throw new Error('Invalid credentials!');
    }

    const token = jwt.sign(

        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return { token };
}