/**
 * Group of controllers
 */

const userControiller = require('./user.controller');
const authController = require('./auth.controller');

module.exports = {
    ...userControiller,
    ...authController
}