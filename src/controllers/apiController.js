
const mongoose = require('mongoose');
const { uploadSingleFile, uploadMultipleFiles } = require('../services/fileService')
const User = require('../models/user')


const getUsersApi = async (req, res) => {
    const results = await User.find({});
    return res.status(200).json(
        {
            errCode: 0,
            data: results
        }
    )
}

const createUserapi = async (req, res) => {
    const { id, name, email, city } = req.body
    const user = await User.create({
        name,
        email,
        city
    })
    return res.status(200).json(
        {
            errCode: 0,
            data: user
        }
    )
}




const updateUserApi = async (req, res) => {
    const { id, name, email, city } = req.body
    try {
        const user = await User.updateOne({ _id: id }, { name, email, city })
        return res.status(200).json(
            {
                errCode: 0,
                data: user
            }
        )
    }
    catch (err) {
        return res.send('bug')
    }
}


const deleteUserApi = async (req, res) => {
    const { id } = req.body
    try {
        const user = await User.deleteOne({ _id: id }).exec()
        return res.status(200).json(
            {
                errCode: 0,
                data: user
            }
        )
    }
    catch (err) {
        return res.send('bug')
    }


}

const postUploadSingleFileApi = async (req, res) => {


    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    const results = await uploadSingleFile(req.files.image)
    console.log(results)
    return res.status(200).json({
        EC: 0,
        data: results
    })
}
const postUploadMultipleFilesApi = async (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    if (Array.isArray(req.files.image)) {

        const results = await uploadMultipleFiles(req.files.image)
        console.log(results)
        return res.status(200).json({
            EC: 0,
            data: results
        })
    }
    else {
        return await postUploadSingleFileApi(req, res)
    }
}


module.exports = {
    getUsersApi, createUserapi, updateUserApi, deleteUserApi, postUploadSingleFileApi, postUploadMultipleFilesApi
}