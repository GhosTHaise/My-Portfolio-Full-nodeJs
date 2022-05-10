const express = require('express')
const Router = express.Router();
const {projetView} = require("../controllers/projetController");

Router.get('/projet',projetView);
module.exports = Router;