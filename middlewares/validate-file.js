/**
 * Verify if we got an empty file
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validateFileUpload = (req, res, next) => {
    
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.fileUploaded) {
        return res.status(400).json({
            ok: false,
            message: 'Not files to upload'
        });
    }
    next();
}

module.exports = {
    validateFileUpload
}