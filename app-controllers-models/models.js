const db = require('../db/connection')

//#3
exports.fetchCategories = () => {
   return db.query('SELECT * FROM categories;')
    .then(result => {
        return result.rows;
    })
}

//#4
exports.fetchReviewById = (reviewId) => {

    //reject promise if :review_id contains non-numbers
    if (/[^\d]/.test(reviewId.review_id)) {
        return Promise.reject({status: 400, msg: '400: Invalid ID Format'});
    }


    return db.query('SELECT * FROM reviews WHERE review_id = $1', [reviewId.review_id])
    .then(result => {

        //reject promise if :review_id is out of range (result array is empty)
        if (result.rows.length === 0) {
            return Promise.reject({status: 404, msg: '404: ID Out Of Range'});
        }

        return result.rows[0];
    })
}



