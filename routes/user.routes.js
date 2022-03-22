const { Router } = require('express');
const { check } = require('express-validator');

const { createUser } = require('../controllers');
const { validateFields } = require('../middlewares');
const { passwordValidator, usernameValidator, existsEmailUser, existsUsername } = require('../helpers');

const api = Router();

api.post('/', 
[
    check('name', 'The name is required.').not().isEmpty(),
    check('surname', 'The surname is required.').not().isEmpty(),
    check('email', 'The email is required.').not().isEmpty(),
    check('email').custom(existsEmailUser),
    check('username', 'The username is required.').not().isEmpty(),
    check('username').custom(existsUsername),
    check('password', 'The password is required.').not().isEmpty(),
    check('email', 'The email is not valid !').isEmail(),
    // check('username').custom(usernameValidator),
    check('password').custom(passwordValidator),
    validateFields
], createUser);

module.exports = api;

