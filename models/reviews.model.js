const db = require('../db/connection')

//#4
exports.fetchReviewById = ({review_id}) => {

    const promiseArray = [db.query('SELECT * FROM reviews WHERE review_id = $1;', [review_id]),
                        db.query('SELECT * FROM comments WHERE review_id = $1', [review_id])];

    return Promise.all(promiseArray)
    .then(results => {
        //reject promise if :review_id is not found (result array is empty)
        if (!results[0].rows.length) {
            return Promise.reject({status: 404, msg: 'ID Not Found'});
        }
        results[0].rows[0].comment_count = results[1].rows.length;
        return results[0].rows[0];
    })
}

//#?? gets comments for given review - implement into #4 (fetchReviewById OR CONTROLLER??) and #7
// exports.fetchCommentCount = (review_id) => {
//     return db.query('SELECT * FROM comments WHERE review_id = $1', [review_id])
//     .then(result => {
//         console.log(result.rows)
//         return result.rows[0]
//     })
// }

//#5
updateReviewVotes = ({review_id}, {inc_votes}) => {
    return db.query('UPDATE reviews SET votes = votes + $1 WHERE review_id = $2;', [inc_votes, review_id]);
}