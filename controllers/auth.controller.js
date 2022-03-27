const bcryotjs = require('bcryptjs');
const { generateJWT } = require('../helpers');
const User = require('../models/user');

/**
 * Method to sign in
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const login = async (req, res) => {
    const { emailOrUsername, password } = req.body;

    const query = {$or: [{email: emailOrUsername.toLowerCase()}, {username: emailOrUsername.toLowerCase()}]};
    const user = await User.findOne(query);

    if (!user || !user.isActive) return res.status(400).json({
        ok: false,
        message: 'Invalid credentials.'
    });

    const comaparePassword = bcryotjs.compareSync(password, user.password);
    if (!comaparePassword) return res.status(400).json({
        ok: false,
        message: 'Invalid credentials.'
    });

    const token = await generateJWT(user._id);

    res.json({ token });
}

module.exports = {
    login
};