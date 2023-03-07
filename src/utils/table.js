const { DataTypes } = require('sequelize')
const { sequelize } = require("../db/connection");   


const Invoices = sequelize.define("invoice", {
    invoiceId: {
        type: DataTypes.INTEGER
    },
    product: {
        type: DataTypes.STRING,
    },
    amount:{
        type: DataTypes.INTEGER,
    },
    username : {
        type: DataTypes.STRING,
    }
})


module.exports = Invoices
