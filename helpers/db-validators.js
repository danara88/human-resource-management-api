const res = require('express/lib/response');
const User = require('../models/user');

/**
 * Validate if the user email is not registered yet
 */
const existsEmailUser = async (email = '') => {
    email = email.toLowerCase();
    const user = await User.findOne({ email });
    if (user) throw new Error(`The email ${ email } is already registered.`);
}

/**
 * Validate if the user email is not registered yet
 */
 const existsUsername = async (username = '') => {
    username = username.toLowerCase();
    const user = await User.findOne({ username });
    if (user) 
        throw new Error(`The username ${ username } is already registered.`);
}

/**
 * Validates if the user exists
 * @param {*} id 
 */
const existsUser = async (id = '') => {
    const user = await User.findById(id);
    if (!user || !user.isActive) 
        throw new Error(`The user with ID ${ id } does not exist.`);

}


module.exports = {
    existsEmailUser,
    existsUsername,
    existsUser
}