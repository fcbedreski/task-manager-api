const bcrypt = require('bcrypt');

const users = [] //temp, database later

exports.register = async (email, password) => {

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
        id: users.length + 1,
        email,
        password: hashedPassword,
    };

    users.push(user); //temp

    return { id: user.id, email: user.email }; 
}