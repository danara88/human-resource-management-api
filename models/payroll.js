const moment = require('moment');
const { Schema, model } = require('mongoose');

const PayrollSchema = new Schema({
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: [true, 'The employee is required.']
    },
    amount: {
        type: Number,
        required: [true, 'The amount is required.']
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

PayrollSchema.methods.toJSON = function() {
    const { __v, ...payroll } = this.toObject();
    return payroll;
}

module.exports = model('Payroll', PositionSchema);