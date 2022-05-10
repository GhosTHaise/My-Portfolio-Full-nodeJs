const express = require("express");
const {homeView,hello} = require('../controllers/homeController')
const Router = express.Router();

Router.get('/',homeView);
Router.get('/hello',hello);
module.exports = Router;
