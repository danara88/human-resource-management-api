const moment = require('moment');
const { Schema, model } = require('mongoose');

const PositionSchema = new Schema({
    title: {
        type: String,
        required: [true, 'The title is required.']
    },
    jobFunction: {
        type: String,
        required: [true, 'The job function is required.']
    },
    jobSubFunction: {
        type: String
    },
    level: {
        type: Number,
        required: [true, 'The level is required.']
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

PositionSchema.methods.toJSON = function() {
    const { __v, ...position } = this.toObject();
    return position;
}

module.exports = model('Position', PositionSchema);