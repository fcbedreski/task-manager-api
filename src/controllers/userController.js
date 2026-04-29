const userService = require(userService);

exports.register = async (req, res) => {
    const {email, password} = req.body; 

    try {

        const user = await userService.register(email, password);
        res.status(201).json(user);

    } catch (err) {

        res.status(400).json({error: err.message});
        
    }
}