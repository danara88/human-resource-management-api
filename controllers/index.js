/**
 * Group of controllers
 */

const userControiller = require('./user.controller');
const authController = require('./auth.controller');
const uplaodsController = require('./uploads.controller');

module.exports = {
    ...userControiller,
    ...authController,
    ...uplaodsController,
}