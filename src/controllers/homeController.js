const { connection } = require('../config/database')
const services = require('../services/CRUDservices')

const getHomePage = (req, res) => {
    return res.render('home.ejs')
}
const createPage = async (req, res) => {
    return res.render('createUser.ejs')
}
const listUser = async (req, res) => {
    const results = await services.getAllUser()

    return res.render('listUsers.ejs', { data: results })


}
const updatePage = async (req, res) => {
    const userid = req.params.userid;
    const results = await services.getUserById(userid)
    return res.render('edit.ejs', { data: results[0] })
}
const updateUsers = async (req, res) => {
    const { id, name, email, city } = req.body
    await services.updateUserByID(email, name, city, id)
    res.redirect('/list')
}

const userPage = async (req, res) => {
    const { id, name, email, city } = req.body
    const [results, fields] = await connection.query(
        'insert into  Users(id,email,name,city) values (?,?,?,?)', [id, email, name, city]
    );
    res.redirect('/list')

}

const postDeleteUser = async (req, res) => {
    const userid = req.params.userid;
    const results = await services.getUserById(userid)
    return res.render('delete.ejs', { data: results[0] })

}
const confirmDelete = async (req, res) => {
    console.log(req.body)
    const { id, email } = req.body
    await services.deleteUserById(id)
    res.redirect('/list')
}
module.exports = {
    getHomePage, userPage, listUser, createPage, updatePage, updateUsers, postDeleteUser, confirmDelete
}