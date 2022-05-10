const express = require('express')
const Router = express.Router();
const {contactView,SendMail} = require('../controllers/contactController')

Router.get('/contact',contactView);
Router.post('/send-Mail',SendMail);
module.exports = Router;