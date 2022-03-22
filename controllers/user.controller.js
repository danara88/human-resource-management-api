const bcryptjs = require('bcryptjs');
const User = require('../models/user');

/**
 * Method to create a user
 * @param {*} req 
 * @param {*} res 
 */
const createUser = async (req, res) => {
    const { name, surname, email, username, password } = req.body;

    const user = new User({name, surname, email, username, password});

    const salt = bcryptjs.genSaltSync(15);

    user.password = bcryptjs.hashSync(password, salt);
    user.email = email.toLowerCase();
    user.username = username.toLowerCase();

    await user.save();

    res.status(200).json({ 
        ok: true,
        user
    });
}


module.exports = {
    createUser
}