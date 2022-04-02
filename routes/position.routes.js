const { Router } = require('express');
const { check } = require('express-validator');
const { createPosition, deletePosition, getPositions, updatePosition, getPosition } = require('../controllers');
const { existsPosition } = require('../helpers');
const { validateJWT, validateADMIN_ROLE, validateFields } = require('../middlewares');

const api = Router();

api.post('/', [
    validateJWT,
    validateADMIN_ROLE,
    check('title', 'The title is required.').notEmpty(),
    check('jobFunction', 'The job function is required.').notEmpty(),
    check('jobSubFunction', 'The job sub function is required.').notEmpty(),
    check('level', 'The level is required.').notEmpty(),
    check('level', 'The level must be a number.').isNumeric().not(),
    validateFields
], createPosition);

api.get('/',
[
    validateJWT,
], getPositions);

api.get('/:id', [
    validateJWT,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( existsPosition ),
    validateFields
], getPosition);

api.put('/:id', [
    validateJWT,
    validateADMIN_ROLE,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( existsPosition ),
    check('title', 'The title is required.').notEmpty(),
    check('jobFunction', 'The job function is required.').notEmpty(),
    check('jobSubFunction', 'The job sub function is required.').notEmpty(),
    check('level', 'The level is required.').notEmpty(),
    check('level', 'The level must be a number.').isNumeric().not(),
    validateFields
], updatePosition);

api.delete('/:id',
[
    validateJWT,
    validateADMIN_ROLE,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( existsPosition ),
    validateFields
], deletePosition);

module.exports = api;