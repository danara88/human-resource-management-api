const { validationResult } = require('express-validator');

/**
 * Method to validate params
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validateFields = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json(errors.mapped());
    next();
};

module.exports = {
    validateFields
}