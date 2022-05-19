const db = require('../db/connection')
const format = require('pg-format')

//#9 checks if VALUE exists in COLUMN in TABLE

//returns true if value exists in table/column, else false
exports.checkIfDataExists = async (table, column, value) => {
    //allowed tables/columns to query
    const allowedTables = ['reviews', 'users', 'categories', 'comments'];
    const allowedColumns = ['body', 'votes', 'author', 'review_id', 'created_at', 'slug', 'description', 'title', 'designer', 'owner', 'review_img_url', 'review_body', 'category', 'avatar_url', 'username', 'name', 'comment_id'];
    //if table/column does not exist reject promise
    if (!allowedTables.includes(table) || !allowedColumns.includes(column)) {
        // return false;
        return Promise.reject({status: 404, msg: 'Resource Not Found'});
    }
    const queryString = format('SELECT * FROM %s WHERE %s = $1;', table, column);
    const queryResult = await db.query(queryString, [value]);
    
    //if value does not exist in specified table/column reject promise
    if (!queryResult.rows.length) {
        // return false;
        return Promise.reject({status: 404, msg: 'Resource Not Found'});
    }
}