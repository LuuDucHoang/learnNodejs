const { connection } = require('../config/database')
const services = require('../services/CRUDservices')
const { db } = require('../../firebase.js')
const sql = require('mssql/msnodesqlv8.js')
const sql2 = require('msnodesqlv8');
const { FieldPath, Filter, FieldValue } = require('firebase-admin/firestore')

const connectionString = "server=DESKTOP-G13BOMB\\SQLEXPRESS;Database=Thuchanh;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}"
var config = {
    server: "DESKTOP-G13BOMB\\SQLEXPRESS", // eg:: 'DESKTOP_mjsi\\MSSQLEXPRESS'
    databse: "Thuchanh",
    options: {
        trustedConnection: true,
        encrypt: true
    },
    driver: "msnodesqlv8",
}
// const conn = new sql.ConnectionPool(config).connect().then((pool) => pool)
const getHomePage = async (req, res) => {
    try {
        sql2.query(connectionString, 'select * from dbo.NhanVien', (err, rows) => {
            if (rows) {
                return res.status(200).send({
                    code: 200,
                    message: 'Thành công',
                    items: rows
                })
            }
        })
    } catch (error) {
        console.log(error);
    }
    // return res.status(200).send(x.data())

}
const createUser = async (req, res) => {
    const { username, password, name, mobile } = req.body
    try {
        sql2.query(connectionString, `select * from dbo.UserInfomation where username ='${username}'`, (err, rows) => {
            if (rows.length === 0) {
                console.log(mobile.length)
                if (mobile.length > 10) {
                    return res.status(422).send({
                        code: 422,
                        message: 'Số điện thoại lớn hơn 10 ký tự',
                    })
                }
                if (username && password && name && mobile) {
                    sql2.query(connectionString, `insert into dbo.UserInfomation(username, password, name, mobile)
                        values ('${username}', '${password}', '${name}', '${mobile}')
                    `)
                    return res.status(200).send({
                        code: 200,
                        message: 'Tạo tài khoản thành công',
                    })
                }

                else {
                    return res.status(422).send({
                        code: 422,
                        message: 'Nhập đủ thông tin',
                    })
                }
            }
            return res.status(422).send({
                code: 422,
                message: 'Tên tài khoản đã tồn tại',
            })

        })
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: error,
        })
    }
}

const login = async (req, res) => {
    const { username, password } = req.body
    try {
        sql2.query(connectionString, `select * from dbo.UserInfomation where username = '${username}'`, (err, rows) => {
            if (rows.length === 0) {
                return res.status(400).send({
                    code: 400,
                    message: 'Tài khoản không tồn tại',
                })
            }
            if (username, password) {
                sql2.query(connectionString, `select * from dbo.UserInfomation where username ='${username}' and password='${password}' `, (err, rows) => {
                    if (rows.length > 0) {
                        return res.status(200).send({
                            code: 200,
                            message: 'Đăng nhập thành công!!',
                            items: rows[0]
                        })
                    }
                    else {
                        return res.status(400).send({
                            code: 400,
                            message: 'Tài khoản hoặc mật khẩu không đúng',
                            items: false
                        })
                    }
                })
            }
        })
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: error,
        })
    }

}

const action = async (req, res) => {
    const { temp } = req.body
    try {
        sql2.query(connectionString, `select * from dbo.Action where ${+temp} > temperatureFrom and ${+temp} <= temperatureTo `, (err, rows) => {
            if ( rows && rows.length > 0) {
                return res.status(200).send({
                    code: 200,
                    message: 'Thành công',
                    items: rows[0]
                })
            }
            else {
                return res.status(400).send({
                    code: 400,
                    message: 'Không có hoạt đồng phù hợp',
                })
            }
        })
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: error,
        })
    }


}
const listUser = async (req, res) => {



}
const updatePage = async (req, res) => {

}
const updateUsers = async (req, res) => {

}

const userPage = async (req, res) => {


}

const postDeleteUser = async (req, res) => {

}
const confirmDelete = async (req, res) => {

}
module.exports = {
    getHomePage, userPage, listUser, createUser, updatePage, updateUsers, postDeleteUser, confirmDelete,
    login, action
}