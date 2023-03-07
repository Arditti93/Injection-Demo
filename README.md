# SQL Injection Demo
This repo is for educational purpose only to demostraight the secuirty vulnerabilities in RAW SQL commands. The only injection taking place is on my own tables containing test data

## src
### server.js
Contains the express server and POST routes

### Public
Contains the HTML to display invoices and to login once the form has been submited 

### db
Contains the connection to the MySQL databse. **NOTE** your own connection string must be added in .env file if you wish to run this application locally

### utils
#### creation.js 
Change the hard coded values in the `createInvoice()` and `createAcc()` functions and run this file in your terminal to create new invoice and accounts.

#### invoice.js 
#### user.js
Contains the models for the user and invoices tables

## Injection Commands
To return all invoices from the invoices table enter the following into the input box in the find an invoice form
`67 OR 1=1`

To return all users accounts from the users table, enter the following in the username and password input boxes in the login form
` " OR ""=" `










