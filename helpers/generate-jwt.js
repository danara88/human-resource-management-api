const jwt = require('jsonwebtoken');

/**
 * Method to generate the JWT token
 * @param {*} uid 
 * @returns 
 */
const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {

        uid = uid.toString();
        const payload = { uid };

        jwt.sign(payload, process.env.SECRET_JWT, {
            expiresIn: '1h'
        }, (err, token) => {
            if (err) {
                reject('The token could not be generated.');
            } else {    
                resolve(token);
            }
        });
    });
}

module.exports = {
    generateJWT
}