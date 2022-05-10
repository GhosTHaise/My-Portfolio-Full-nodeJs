const express = require("express");
const {skillView,skillList} = require('../controllers/skillController')
const Router = express.Router();

Router.get('/skill',skillView);
Router.get('/list',skillList);
module.exports = Router;