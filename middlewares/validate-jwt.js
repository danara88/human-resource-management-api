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
        res.status(401).json({
            ok: false,
            message: 'Invalid authentication token.'
        });
    }

}

/**
 * Method to validates if the user is an Admin
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const validateADMIN_ROLE = async (req, res, next) => {

    const { _id: uid } = req.user;

    try {
        const userDB = await User.findById(uid);

        if (!userDB || !userDB.status) return res.status(400).json({
            ok: false,
            message: 'The user does not exists'
        });

        if (userDB.role !== 'ADMIN_ROLE') return res.status(403).json({
            ok: false,
            message: 'You are not allowed to perform this action.'
        });

        next();
        
    } catch (error) {
        res.status(403).json({
            ok: false,
            message: 'You are not allowed to perform this action.'
        });
    }
}

module.exports = {
    validateJWT,
    validateADMIN_ROLE
}