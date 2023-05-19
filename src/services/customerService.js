const { connection } = require('../config/database')
const Customer = require('../models/customer')

module.exports = {
    createCustomerService: async (customerData) => {
        const { name, address, phone, email, description, image } = customerData
        try {
            const results = await Customer.create({
                name, address, phone, email, description, image
            })
            return {
                message: null,
                results
            }
        } catch (error) {

            return {
                message: error,
                results: null
            }
        }
    },
    createArrayCustomersService: async (customers) => {
        console.log(customers)
        try {
            const results = await Customer.insertMany(customers)
            console.log(results + '+++')
            return {
                message: null,
                results
            }
        } catch (error) {
            return {
                message: error,
                results: null
            }
        }
    },
    getApiCustomers: async (req, res) => {
        try {
            const results = await Customer.find({})
            return {
                message: null,
                results
            }
        } catch (error) {
            return {
                message: error,
                results: null
            }
        }
    },
    updateApiCustomer: async (data) => {
        try {
            const results = await Customer.updateOne({ _id: data.id }, { name: data.name })
            console.log(results)
            return {
                message: null,
                results
            }
        } catch (error) {
            return {
                message: error,
                results: null
            }
        }
    },
    deleteApiCustomer: async (data) => {
        try {
            const results = await Customer.deleteById({ _id: data.id })
            return {
                message: null,
                results
            }
        } catch (error) {
            return {
                message: error,
                results: null
            }
        }
    },
    deleteArrayCustomerService: async (data) => {
        try {
            const results = await Customer.delete({ _id: { $in: data } },)
            return {
                message: null,
                results
            }
        } catch (error) {
            return {
                message: error,
                results: null
            }
        }
    }
}