const { connection } = require('../config/database')
const services = require('../services/CRUDservices')

const getHomePage = (req, res) => {
    return res.render('home.ejs')
}
const createPage = async (req, res) => {
    // const { id, name, occupation, age } = req.body
    // const [results, fields] = await connection.query(
    //     'insert into  employee_table(id,name,occupation,age) values (?,?,?,?)', [id, name, occupation, age],
    // );
    // console.log(results)
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

const userPage = async (req, res) => {
    const { id, name, occupation, age } = req.body
    console.log(req.body)
    const [results, fields] = await connection.query(
        'insert into  employee_table(id,name,occupation,age) values (?,?,?,?)', [id, name, occupation, age]
    );
    console.log(results)
    return res.send('hi')
}
module.exports = {
    getHomePage, userPage, listUser, createPage, updatePage
}