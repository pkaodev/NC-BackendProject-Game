const db = require('../db/connection')

//#4
exports.fetchReviewById = ({review_id}) => {

    //reject promise if :review_id contains non-numbers
    if (/[^\d]/.test(review_id)) {
        return Promise.reject({status: 400, msg: '400: Invalid ID Format'});
    }


    return db.query('SELECT * FROM reviews WHERE review_id = $1', [review_id])
    .then(result => {

        //reject promise if :review_id is out of range (result array is empty)
        if (result.rows.length === 0) {
            return Promise.reject({status: 404, msg: '404: ID Out Of Range'});
        }

        return result.rows[0];
    })
}

//#5
updateReviewVotes = ({review_id}, {inc_votes}) => {
    //reject promise if :review_id contains non-numbers
    if (/[^\d]/.test(review_id)) {
        return Promise.reject({status: 400, msg: '400: Invalid ID Format'});
    //or non-number
    } else if (typeof inc_votes !== 'number') {
        return Promise.reject({status: 400, msg: '400: Invalid Vote Format'});
    }


    return db.query('SELECT * FROM reviews WHERE review_id = $1', [review_id])
    .then(result => {
        //reject promise if :review_id is out of range (result array is empty)
        if (result.rows.length === 0) {
            return Promise.reject({status: 404, msg: '404: ID Out Of Range'});
        }
        result.rows[0].votes += inc_votes;
        return result.rows[0];
    })
}