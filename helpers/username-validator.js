/**
 * Method to validate username format
 * @param {*} username 
 */
const usernameValidator = (username = '') => {
    if (username.length <= 5) 
        throw new Error('Username length minimum 6 characters.');
    if (username.length >= 29) 
        throw new Error('Username length maximum 30 characters.');
}

module.exports = {
    usernameValidator
}