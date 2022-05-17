const db = require('../db/connection')

//#6
exports.fetchUsers = () => {
    return db.query('SELECT * FROM users;')
     .then(result => {
         return result.rows;
    })
}