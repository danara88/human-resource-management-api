const moment = require('moment');
const Position = require('../models/position');

/**
 * Method to create a position
 * @param {*} res 
 * @param {*} res 
 */
const createPosition = async (req, res) => {
    const { title, jobFunction, jobSubFunction, level } = req.body;

    try {
        const position = new Position({ title, jobFunction, jobSubFunction, level });
        await position.save();

        res.json({
            ok: true,
            position
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Something went wrong.'
        });
    }
}

/**
 * Method to get positions
 * @param {*} req 
 * @param {*} res 
 */
const getPositions = async (req, res) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { isActive: true };

    const [ total, positions ] = await Promise.all([
        Position.countDocuments(query),
        Position.find(query).skip(Number(from))
                            .limit(Number(limit))
    ]);

    res.json({
        ok: true,
        total,
        positions
    });
}

/**
 * Method to get position detail
 * @param {*} req 
 * @param {*} res 
 */
const getPosition = async (req, res) => {
    const { id } = req.params;
    const position = await Position.findById(id);
    
    res.json({
        ok: true,
        position
    });
}

/**
 * Method to update a position
 * @param {*} req 
 * @param {*} res 
 */
const updatePosition = async (req, res) => {
    const { id } = req.params;
    const { createdAt, updatedAt, ...data } = req.body;

    try {
        data.updatedAt = moment().unix();
        const position = await Position.findByIdAndUpdate(id, data, { new: true });

        res.json({
            ok: true,
            position
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong.'
        });
    }
 
}

/**
 * Method to delete a position
 * @param {*} req 
 * @param {*} res 
 */
const deletePosition = async (req, res) => {
    const { id } = req.params;

    try {
        await Position.findByIdAndUpdate(id, { isActive: false }, { new: true });
        res.json({
            ok: true,
            message: 'The position was deleted !'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Something went wrong.'
        });
    }
}

module.exports = {
    createPosition,
    deletePosition,
    getPositions,
    getPosition,
    updatePosition,
}