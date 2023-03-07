const express = require("express");
const { sequelize } = require("./db/connection");
const app =  express()
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));

const port = process.env.PORT 

app.use(bodyParser.json());

app.use("/static", express.static("public"));


app.get('/health',(req,res) => {
	try {
    	res.json({message:"server is ready at 5001 port "})
    } catch (error) {
    	consolelog(error)
      	res.sendStatus(500)
    }
})

app.post('/getInvoice', async (req, res) => {
    let id = req.body.username
    let sql = "SELECT * FROM invoices WHERE invoiceId = " + id;
    console.log(sql)
    //The SQL above is valid and will return ALL rows from the "Users" table, since OR 1=1 is always TRUE.
    const [results] = await sequelize.query(
        sql
    )
    let invoices = results.map(value => value)
    console.log(invoices)
    res.json(invoices)
}) 

app.post('/login', async (req, res) => {
    let user = req.body.username
    let password =  req.body.password

    let sql = 'SELECT * FROM users WHERE username ="' + user + '" AND password ="' + password + '"'
    console.log(sql)
    //The SQL above is valid and will return all rows from the "Users" table, since OR ""="" is always TRUE.

    const [results] = await sequelize.query(
        sql
    )
    let authUser = results.map(value => value)
    res.json(authUser)
    console.log(authUser)
}) 

app.all('*', (req, res) => {
    res.status(404).send('<h1>404! Page not found</h1>');
});

const sync = async () => {
    await sequelize.sync()
}

app.listen(port, ()=> {
    sync()
    console.log(`Listing on port ${port}`)
})
