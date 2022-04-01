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

/**
 * Method to get users
 * @param {*} req 
 * @param {*} res 
 */
const getUsers = async (req, res) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { isActive: true };

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query).skip(Number(from))
                        .limit(Number(limit))
    ]);

    res.json({
        ok: true,
        total,
        users
    });
}

/**
 * Method to update user profile data
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { isActive, 
            password, 
            email,
            role,
            ...data } = req.body;

    try {
        // Validates if the user exists
        const userDB = await User.findById(id);
        
        // Validates if user changed his email
        if (userDB.email !== email) {
            const existsEmail = await User.findOne({ email });
            if (existsEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: `The email ${ email } already exists.`
                });
            }
            data.email = email;
        }

        const user = await User.findByIdAndUpdate(id, data, {new: true});

        res.json({
            ok: true,
            user
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong.'
        });
    }
 
}

/**
 * Method to update user's role
 * @param {*} req 
 * @param {*} res 
 */
const changeUserRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, { role }, { new: true });
        res.status(200).json({
            ok: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Something went wrong.'
        });
    }
}

/**
 * Method to delete a user
 * @param {*} req 
 * @param {*} res 
 */
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await User.findByIdAndUpdate(id, {isActive: false}, {new: true});
        res.json({
            ok: true,
            message: 'The user was deleted !'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Something went wrong.'
        });
    }
}


module.exports = {
    createUser,
    getUsers,
    deleteUser,
    updateUser,
    changeUserRole
}