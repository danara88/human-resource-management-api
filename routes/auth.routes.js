const { Router } = require('express');

const { login } = require('../controllers');

const api = Router();

api.post('/login', [], login)

module.exports = api;