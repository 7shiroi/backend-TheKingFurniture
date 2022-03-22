const routes = require('express').Router();
const responseHandler = require('../helpers/responseHandler');

routes.get('/', (req, res) => responseHandler(res, 200, 'Backend is running well!'));
routes.use('/product', require('./product'));

module.exports = routes;
