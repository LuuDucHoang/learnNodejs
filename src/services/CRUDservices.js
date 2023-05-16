const { connection } = require('../config/database')

const getAllUser = async () => {
    const [results, fields] = await connection.query('select * from Users ');
    return results
}

const getUserById = async (userid) => {
    const [results, fields] = await connection.query(`select * from Users where id = ?  `, [userid]);
    return results

}
const updateUserByID = async (email, name, city, id) => {
    const [results, fields] = await connection.query("update Users set email = ?, name = ? , city = ? where  id = ? ", [email, name, city, id]);
    return results
}
const deleteUserById = async (id) => {
    await connection.query('delete from Users where id = ? ', [id])
}
module.exports = {
    getAllUser, getUserById, updateUserByID, deleteUserById
}