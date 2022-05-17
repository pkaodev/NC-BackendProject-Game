const db = require('../db/connection')

//takes review_id as argument and RETURNS PROMISE returning comment_count
exports.fetchCommentsCount = ({review_id}) => {
    return db.query('SELECT * FROM comments WHERE review_id=$1;', [review_id])
    .then( response => {
        // console.log('From fetchCommentsCount', response.rows.length)
        return response.rows.length;
    })
}


//returns promise returning look-up object for {review_id: comment_count} pairs for all reviews 
exports.fetchCCLookUp = () => {
    return db.query('SELECT * FROM comments')
    .then( (result) => {
        const lookUpObj = {};

        result.rows.forEach(comment => {lookUpObj[`${comment.review_id}`] ? lookUpObj[`${comment.review_id}`] ++ : lookUpObj[`${comment.review_id}`] = 1;})

        return lookUpObj;
    })
}