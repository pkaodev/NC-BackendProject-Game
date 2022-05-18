const db = require('../db/connection')
const {checkIfDataExists} = require('./utility.model')

//#9
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

//#10
exports.createComment = async ({review_id}, reqbody) => {

    //reject if request body doesn't contain username and body keys
    if (!reqbody.username || !reqbody.body) {
        return Promise.reject({status: 400, msg: 'Invalid Input'})
    }
    
    //check if review_id exists in reviews table
    await checkIfDataExists('reviews', 'review_id', review_id);
    //check if username exists in users table
    await checkIfDataExists('users', 'username', reqbody.username)

    const comment = await db.query(`INSERT INTO comments
                                    (votes, created_at, author, body, review_id)
                                    VALUES
                                    (0, NOW(), '${reqbody.username}', '${reqbody.body}', ${review_id})
                                    RETURNING *;`)
    return comment.rows[0];
}

//#12
exports.removeComment = async (reqParams) => {
    //check if comment_id exists
    await checkIfDataExists('comments', 'comment_id', reqParams.comment_id )
    db.query('DELETE FROM comments WHERE comment_id = $1;', [reqParams.comment_id]);
}