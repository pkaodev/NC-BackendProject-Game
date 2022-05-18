const db = require('../db/connection')
const {checkIfDataExists} = require('./utility.model')


exports.fetchCommentsForReview = async ({review_id}) => {
    const comments = await db.query('SELECT * FROM comments WHERE review_id = $1;', [review_id]);

    //if no comments found
    if (!comments.rows.length) {

        //check if review_id exists, reject if not
        await checkIfDataExists('reviews', 'review_id', review_id);

        //valid review_id but no comments
        return [{}];
    }
    return comments.rows;
}