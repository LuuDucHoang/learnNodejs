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
router.post('/users', homeController.userPage)
router.post('/login', homeController.login)
router.get('/list', homeController.listUser)
router.post('/action', homeController.action)
router.post('/create', homeController.createUser)
router.post('/update-user', homeController.updateUsers)
router.get('/update/:userid', homeController.updatePage)
router.post('/delete-ueser/:userid', homeController.postDeleteUser)
router.post('/delete-user', homeController.confirmDelete)
module.exports = router