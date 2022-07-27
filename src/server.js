const express = require("express");
const app =  express()
const port = process.env.PORT || 5001;


app.use("/static", express.static("public"));
//access public folder when a req is made to static

app.listen(port, ()=> {
    console.log(`Listing on port ${port}`)
})
