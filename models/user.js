const moment = require('moment');
const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required.']
    },
    surname: {
        type: String,
        required: [true, 'The surname is required.']
    },
    email: {
        type: String,
        required: [true, 'The email is required.'],
        unique: true
    },
    username: {
        type: String,
        required: [true, 'The username is required.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is required.']
    },
    role: {
        type: String,
        required: [true, 'The role is required.'],
        default: 'USER_ROLE',
        enum: ['ADMIN_ROLE', 'TRAINNING_ROLE', 'EMPLOYEE_ROLE']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: String,
        default: moment().unix()
    },
    updatedAt: {
        type: String
    }
});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('User', UserSchema);