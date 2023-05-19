const { uploadSingleFile, uploadMultipleFiles } = require('../services/fileService')
const { createCustomerService, createArrayCustomersService, getApiCustomers,
    updateApiCustomer, deleteApiCustomer, deleteArrayCustomerService } = require('../services/customerService');
const customerService = require('../services/customerService');
module.exports = {
    postCreateCutsomer: async (req, res) => {
        let imageUrl = ''
        let results
        const { name, address, phone, email, description } = req.body
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        else {
            results = await uploadSingleFile(req.files.image)
            imageUrl = results.path
        }
        let customerData = {
            name, address, phone, email, description, image: imageUrl
        }
        const customer = await createCustomerService(customerData)
        return res.status(200).json(
            {
                errCode: 0,
                data: customer
            }
        )
    },
    postCrateArrayCustomes: async (req, res) => {
        if (req.body.customers) {
            const results = await createArrayCustomersService(req.body.customers)
            return res.status(200).json(
                {
                    errCode: 0,
                    data: results
                }
            )
        }
        else {
            return res.status(500).json(
                {
                    errCode: -1,
                    data: null
                }
            )
        }
    },
    getCustomers: async (req, res) => {
        const results = await getApiCustomers()
        return res.status(200).json(
            {
                errCode: 0,
                data: results
            }
        )

    },
    updateCustomers: async (req, res) => {
        const results = await updateApiCustomer(req.body)

        return res.status(200).json(
            {
                errCode: 0,
                data: results
            }
        )
    },
    deleteCustomers: async (req, res) => {
        const results = await deleteApiCustomer(req.body)
        return res.status(200).json(
            {
                errCode: 0,
                data: results
            }
        )
    }
    ,
    deleteArratCustomers: async (req, res) => {
        const results = await deleteArrayCustomerService(req.body.data)
        return res.status(200).json(
            {
                errCode: 0,
                data: results
            }
        )
    }
}