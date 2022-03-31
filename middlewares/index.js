/**
 * Group of middlewares
 */

const validateFields = require('./validate-fields');
const validateJWT = require('./validate-jwt');
const validateFile = require('./validate-file');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateFile
}