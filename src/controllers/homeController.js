const { connection } = require('../config/database')
const services = require('../services/CRUDservices')
const mongoose = require('mongoose');
const User = require('../models/user')
const getHomePage = (req, res) => {
    return res.render('home.ejs')
}
const createPage = async (req, res) => {
    return res.render('createUser.ejs')
}
const listUser = async (req, res) => {
    const results = await User.find({});
    return res.render('listUsers.ejs', { data: results })

}
const updatePage = async (req, res) => {
    const userid = req.params.userid;
    const results = await User.find({ _id: userid })
    return res.render('edit.ejs', { data: results[0] })
}


const updateUsers = async (req, res) => {
    const { id, name, email, city } = req.body
    console.log(id)
    await User.updateOne({ _id: id }, { name, email, city })
    res.redirect('/list')
}

const userPage = async (req, res) => {
    const { id, name, email, city } = req.body

    // const [results, fields] = await connection.query(
    //     'insert into  Users(id,email,name,city) values (?,?,?,?)', [id, email, name, city]
    // );
    await User.create({
        name,
        email,
        city
    })
    res.redirect('/list')

}

const postDeleteUser = async (req, res) => {
    const userid = req.params.userid;
    const results = await User.findById(userid)
    return res.render('delete.ejs', { data: results })

}
const confirmDelete = async (req, res) => {
    const { id, email } = req.body
    await User.deleteOne({ _id: id }).exec()
    res.redirect('/list')
}
module.exports = {
    getHomePage, userPage, listUser, createPage, updatePage, updateUsers, postDeleteUser, confirmDelete
}