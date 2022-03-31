const { Router } = require('express');
const { check } = require('express-validator');

const api = Router();

const { updateImage } = require('../controllers');
const { validCollections } = require('../helpers');
const { validateFields, validateFileUpload, validateJWT } = require('../middlewares');

api.put('/:collection/:id',
[
    validateJWT,
    validateFileUpload,
    check('id', 'The ID is not valid.').isMongoId(),
    check('collection').custom(c => validCollections(c, ['users','employee'])),
    validateFields
], updateImage);

module.exports = api;

