const { Router } = require('express');
const { check } = require('express-validator');

const { createUser, deleteUser, getUsers, updateUser, changeUserRole, getUser } = require('../controllers');
const { validateFields, validateJWT, validateADMIN_ROLE, validateADMIN_ROLE_or_SameUser } = require('../middlewares');
const { passwordValidator, existsEmailUser, existsUsername, existsUser, validRoles } = require('../helpers');

const api = Router();

api.post('/', [
    validateJWT,
    validateADMIN_ROLE,
    check('name', 'The name is required.').not().isEmpty(),
    check('surname', 'The surname is required.').not().isEmpty(),
    check('email', 'The email is required.').not().isEmpty(),
    check('email').custom(existsEmailUser),
    check('username', 'The username is required.').not().isEmpty(),
    check('username').custom(existsUsername),
    check('password', 'The password is required.').not().isEmpty(),
    check('email', 'The email is not valid !').isEmail(),
    check('password').custom(passwordValidator),
    validateFields
], createUser);


api.get('/', [
    validateJWT,
    validateADMIN_ROLE
], getUsers);

api.get('/:id', [
    validateJWT,
    validateADMIN_ROLE_or_SameUser,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( existsUser ),
    validateFields
], getUser);

api.put('/:id', [
    validateJWT,
    validateADMIN_ROLE_or_SameUser,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( existsUser ),
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is required').not().isEmpty(),
    check('role', 'The role is required').not().isEmpty(),
    check('email', 'The email is not valid').isEmail(),
    validateFields
], updateUser);

api.put('/change-role/:id', [
    validateJWT,
    validateADMIN_ROLE,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( existsUser ),
    check('role', 'The role is required').not().isEmpty(),
    check('role').custom(role => validRoles(role, ['ADMIN_ROLE', 'TRAINNING_ROLE', 'EMPLOYEE_ROLE'])),
    validateFields
], changeUserRole);

api.delete('/:id',
[
    validateJWT,
    validateADMIN_ROLE,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( existsUser ),
    validateFields
], deleteUser);

module.exports = api;

