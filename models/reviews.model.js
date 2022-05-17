const db = require('../db/connection')

//#4
exports.fetchReviewById = ({review_id}) => {
    return db.query('SELECT * FROM reviews WHERE review_id = $1', [review_id])
    .then(result => {
        //reject promise if :review_id is not found (result array is empty)
        if (!result.rows.length) {
            return Promise.reject({status: 404, msg: 'ID Not Found'});
        }
        return result.rows[0];
    })
}

//#5
updateReviewVotes = ({review_id}, {inc_votes}) => {
    return db.query('UPDATE reviews SET votes = votes + $1 WHERE review_id = $2;', [inc_votes, review_id]);
}
//RETURNING *
// .then(result => {
//     //reject promise if :review_id is not found (result array is empty)
//     if (!result.rows.length) {
//         return Promise.reject({status: 404, msg: 'ID Not Found'});
//     }
//     return result.rows[0];
// })