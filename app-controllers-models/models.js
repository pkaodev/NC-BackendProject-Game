const db = require('../db/connection')

//#3
exports.fetchCategories = () => {
   return db.query('SELECT * FROM categories;')
    .then(result => {
        return result.rows;
    })
}