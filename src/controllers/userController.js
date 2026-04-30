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

exports.login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const result = await userService.login(email, password);
        res.json(result);

    } catch (err) {

        res.status(401).json({ error: err.message });
    }
}