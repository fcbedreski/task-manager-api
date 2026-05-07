const userService = require('../services/userService');

exports.register = async (req, res) => {
    const {email, password} = req.body; 

    try {

        const user = await userService.register(email, password);
        res.status(201).json({
            success: true,
            data: user
        });

    } catch (err) {

        next(err);
        
    }
}

exports.login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const result = await userService.login(email, password);
        res.json({
            success: true,
            data: token
        });

    } catch (err) {

        next(err);
    }
}