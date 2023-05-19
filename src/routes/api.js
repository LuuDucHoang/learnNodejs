const express = require('express')
const homeController = require('../controllers/homeController')
const routerApi = express.Router()
const Customer = require('../models/customer')

const { getUsersApi, createUserapi, updateUserApi, deleteUserApi
    , postUploadSingleFileApi, postUploadMultipleFilesApi } = require('../controllers/apiController')

const { postCreateCutsomer, postCrateArrayCustomes, getCustomers, updateCustomers, deleteCustomers,
    deleteArratCustomers } = require('../controllers/customerController')
const User = require('../models/user')
routerApi.get('/users', getUsersApi)
routerApi.post('/users', createUserapi)
routerApi.put('/users', updateUserApi)
routerApi.delete('/users', deleteUserApi)
routerApi.post('/file', postUploadSingleFileApi)
routerApi.post('/files', postUploadMultipleFilesApi)
routerApi.post('/customers', postCreateCutsomer)
routerApi.post('/customers-many', postCrateArrayCustomes)
routerApi.get('/customers', getCustomers)
routerApi.put('/customers', updateCustomers)
routerApi.delete('/customers', deleteCustomers)
routerApi.delete('/customers-many', deleteArratCustomers)

routerApi.get('/customers/info', async (req, res) => {
    const results = await Customer.find({ name: req.query.name })
    return res.status(200).json({
        data: results
    })
})
routerApi.get('/customers/:name', (req, res) => {
    return res.send(req.params)
})

module.exports = routerApi