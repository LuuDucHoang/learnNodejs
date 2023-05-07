const express = require('express')
const homeController = require('../controllers/homeController')
const router = express.Router()
router.get('/', homeController.getHomePage)
// app.get('/data', (req, res) => {

//     res.send('Hello Bee!')
// })
// app.get('/html', (req, res) => {

//     res.send(`<h2>Hello</h2>`)
// })
module.exports = router