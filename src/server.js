const express = require("express");
const { sequelize } = require("./db/connection");
const app =  express()

const bodyParser = require('body-parser');
const Invoices = require("./utils/table");
app.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));

const port = process.env.PORT || 5001;

app.use(bodyParser.json());

app.use("/static", express.static("public"));
//access public folder when a req is made to static

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
    try {
        const [results] = await sequelize.query(
            sql
        )
        }catch {
            let invoices = results.map(value => value)
            console.log(invoices)
            res.json(invoices)
        }
}) 

//UNION ATTACK
// 1 AND 1=2 UNION SELECT  table_catalog, table_schema, table_name, table_type, engine, version, row_format FROM information_schema.tables

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
