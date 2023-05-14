require('dotenv').config()
const express = require('express')
const configViewEngine = require('./config/viewEngine')
const webRouter = require('./routes/web')
const { connection } = require('./config/database')
const app = express()
const port = process.env.PORT;
const hostName = process.env.HOST_NAME

//config get input
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies


const insert = () => {
    console.log(1)
    connection.query(
        'insert into  `employee_table(id,name,occupation,age)` values (2,"Bee","Bonk","18")',
        function (err, results, fields) {
            console.log(results); // results contains rows returned by server

        }
    )
}


configViewEngine(app)
app.use('/', webRouter)
app.listen(port, hostName, () => {
    console.log(`Example app listening on port ${port}`)
})