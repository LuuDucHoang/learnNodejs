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


configViewEngine(app)
app.use('/', webRouter)
app.listen(port, hostName, () => {
    console.log(`Example app listening on port ${port}`)
})