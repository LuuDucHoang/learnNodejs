require('dotenv').config()
const express = require('express')
const configViewEngine = require('./config/viewEngine')
const webRouter = require('./routes/web')

const app = express()
const port = process.env.PORT;
const hostName = process.env.HOST_NAME

const mysql = require('mysql2')


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})


connection.query(
    'SELECT * FROM `employee_table`',
    function (err, results, fields) {
        console.log(results); // results contains rows returned by server

    }
);

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