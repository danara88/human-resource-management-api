/**
 * Group of middlewares
 */

const validateFields = require('./validate-fields');

module.exports = {
    ...validateFields
}