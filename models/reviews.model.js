const db = require('../db/connection')

//#4
exports.fetchReviewById = ({review_id}) => {
    return db.query(
        `SELECT owner, title, reviews.review_id, designer, review_body, category, review_img_url, reviews.created_at, reviews.votes, COUNT(comment_id)::int AS comment_count
        FROM reviews
        LEFT JOIN comments
        ON reviews.review_id = comments.review_id
        WHERE reviews.review_id = $1
        GROUP BY reviews.review_id;`, [review_id])
    .then(result => {
        //reject promise if :review_id is not found (result array is empty)
        if (!result.rows.length) {
            return Promise.reject({status: 404, msg: 'ID Not Found'});
        }
        return result.rows[0];
    })
}

//#5 updates votes for review
exports.updateReviewVotes = ({review_id}, {inc_votes}) => {
    return db.query('UPDATE reviews SET votes = votes + $1 WHERE review_id = $2;', [inc_votes, review_id])
}

//#8
exports.fetchReviews = () => {
    return db.query(
        `SELECT owner, title, reviews.review_id, category, review_img_url, reviews.created_at, reviews.votes, COUNT(comment_id)::int AS comment_count
        FROM reviews
        LEFT JOIN comments
        ON reviews.review_id = comments.review_id
        GROUP BY reviews.review_id
        ORDER BY reviews.created_at DESC;`
        )
    .then( (result) => {
        return result.rows;
    })
}