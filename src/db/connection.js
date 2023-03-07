require("dotenv").config();
const { Sequelize } = require("sequelize");

exports.sequelize = new Sequelize(process.env.MY_SQL_URI);