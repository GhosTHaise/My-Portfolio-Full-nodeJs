'use strict'
const dotenv = require('dotenv');
dotenv.config();

const {
    EMAIL,
    PASSWORD
} = process.env

module.exports = {
    gmail : EMAIL,
    secret : PASSWORD
}
