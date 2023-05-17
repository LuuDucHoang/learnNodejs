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

//test

configViewEngine(app)
app.use('/', webRouter)
    ; (async () => {
        try {
            await connection();
            app.listen(port, hostName, () => {
                console.log(`Backendapp listening on port ${port}`)
            })
        }
        catch (error) {
            console.log(error)
        }
    })()

