const db = require('../db/connection')

//#4
exports.fetchReviewById = ({review_id}) => {

    return db.query('SELECT * FROM reviews WHERE review_id = $1', [review_id])
    .then(result => {

        //reject promise if :review_id is out of range (result array is empty)
        if (result.rows.length === 0) {
            return Promise.reject({status: 404, msg: 'ID Not Found'});
        }

        return result.rows[0];
    })
}

//#5
updateReviewVotes = ({review_id}, {inc_votes}) => {
    
    //reject promise if :review_id is a non-number
    // if (typeof inc_votes !== 'number') {
    //     return Promise.reject({status: 400, msg: 'Invalid Vote Format'});
    // }

    // return db.query('SELECT * FROM reviews WHERE review_id = $1', [review_id])
   
    return db.query('UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *', [inc_votes, review_id])
    .then(result => {
        //reject promise if :review_id is out of range (result array is empty)
        if (result.rows.length === 0) {
            return Promise.reject({status: 404, msg: 'ID Not Found'});
        }
        return result.rows[0];
    })
}