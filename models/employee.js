const moment = require('moment');
const { Schema, model } = require('mongoose');

const EmployeeSchema = Schema({
    position: {
        type: Schema.Types.ObjectId,
        ref: 'Position',
        required: [true, 'The position is required.']
    },
    fisrtName: {
        type: String,
        required: [true, 'The firstname is required.']
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: [true, 'The lastname is required.']
    },
    birthDate: {
        type: String
    },
    image: {
        type: String
    },
    workEmail: {
        type: String,
        required: [true, 'The work email is required.']
    },
    personalEmail: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    status: {
        type: String,
        required: [true, 'The status is required.'],
        default: 'Active',
        enum: ['Terminated', 'Active']
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

EmployeeSchema.methods.ToJSON = function() {
    const { __v, ...employee } = this.toObject();
    return employee;
}

module.exports = model('Employee', EmployeeSchema);