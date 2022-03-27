const jwt = require('jsonwebtoken');
const User = require('../models/user');

/**
 * Method to validate JWT token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validateJWT = async (req, res, next) => {
    const token = res.header('Authorization');
    if (!token) return res.status(401).json({
        ok: false,
        message: 'There is not an authorization token.'
    });

    try {
        const { uid } = jwt.verify(token, process.env.SECRET_JWT);

        const user = await User.findById(uid);
        if (!user || !user.status) return res.status(401).json({
            ok: false,
            message: 'Invalid authentication token.'
        });

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: 'Invalid authentication token.'
        });
    }

}

module.exports = {
    validateJWT
}