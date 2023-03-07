
const { sequelize } = require("../db/connection");

const Invoices = require("./invoice")
const User = require("./user")

const creatInvoice = async () => {
    await sequelize.sync()
    try {
        await Invoices.create({
            invoiceId: 30,
            product: "Coffee",
            amount: 5,
            username: "Alice"
        })
        console.log("success!")
    } catch (error) {
        console.log(error)
        await sequelize.close()
    }
}

// creatInvoice()  

const creatAcc = async () => {
    await sequelize.sync()
    try {
        await User.create({
            username: "Steve",
            password: "password" 
        })
        console.log("success!")
    } catch (error) {
        console.log(error)
        await sequelize.close()
    }
}

// creatAcc()
