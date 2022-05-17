const db = require('../db/connection')

exports.fetchCommentsForReview = ({review_id}) => {
    console.log(review_id)


    // const checkIfValidReviewId = async (review_id) => {
    //     const isValidId = await db.query('SELECT * FROM reviews WHERE review_id = $1', [review_id])

    //     console.log('wow')
    //     console.log(isValidId.rows)
    // };


    return db.query('SELECT * FROM comments WHERE review_id = $1;', [review_id])
    .then( (comments) => {
        //if no comments return 200 No Comments Found
        if (!comments.rows.length) {
            return Promise.reject({status: 200, msg: 'No Comments Found'})
        }
        return comments.rows;
    })
}