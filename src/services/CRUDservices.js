const { connection } = require('../config/database')

const getAllUser = async () => {
    const [results, fields] = await connection.query('select * from Users ');
    return results
}

const getUserById = async (userid) => {
    const [results, fields] = await connection.query(`select * from Users where id = ?  `, [userid]);
    return results

}

module.exports = {
    getAllUser, getUserById
}