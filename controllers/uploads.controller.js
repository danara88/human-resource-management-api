const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const User = require('../models/user');

/**
 * Method to upload a file image
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateImage = async (req, res) => {
    const { collection, id } = req.params;
    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(404).json({
                    ok: false,
                    message: `The user with ID ${ id } does not exist.`
                });
            }
        break;
        default:
            return res.status(404).json({
                ok: false,
                message: `The collection does not exist.`
            });
    }

    if (model.img) {
        const nameArr = model.img.split('/');
        const name = nameArr[nameArr.length - 1];
        const [ public_id ] = name.split('.');
        cloudinary.uploader.destroy( public_id );
     }

   const { tempFilePath } = req.files.fileUploaded;
   const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
   model.img = secure_url;

   await model.save();

   res.json({
       ok: true,
       model
   });
}


module.exports = {
    updateImage
}