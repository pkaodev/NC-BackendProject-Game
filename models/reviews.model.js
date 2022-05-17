const db = require('../db/connection')
const {fetchCCLookUp} = require('./comments.model')


//#4
exports.fetchReviewById = ({review_id}) => {
    return db.query('SELECT * FROM reviews WHERE review_id = $1;', [review_id])
    .then(result => {
        //reject promise if :review_id is not found (result array is empty)
        if (!result.rows.length) {
            return Promise.reject({status: 404, msg: 'ID Not Found'});
        }
        return result.rows;
    })
}

//#5 updates votes for review and returns updated votes
exports.updateReviewVotes = ({review_id}, {inc_votes}) => {
    return db.query('UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING votes;', [inc_votes, review_id])
    .then( (votes) => {
        //reject promise if review doesn't exist
        if (!votes.rows.length) {
            return Promise.reject({status: 404, msg: 'ID Not Found'});
        }

        return votes.rows[0].votes;
    })
}


//owner (same as username from user table, but named owner?)
//title
//review_id
//category
//review_img_url
//created_at DESC
//votes
//comment_count



//#8
exports.fetchReviews = () => {
    const promiseArray = [];

    promiseArray.push(db.query('SELECT owner, title, review_id, category, review_img_url, created_at, votes FROM reviews ORDER BY created_at DESC;'))

    promiseArray.push(fetchCCLookUp())
    
    return Promise.all(promiseArray)
    .then( (results) => {

        //append comment_count onto each review object using look up object
        results[0].rows.forEach(review => { results[1][`${review.review_id}`] ? review.comment_count = results[1][`${review.review_id}`] : review.comment_count = 0})
        
        return results[0].rows
    })

    
    
//    return db.query('SELECT owner AS username, title, review_id, category, review_img_url, created_at, votes FROM reviews ORDER BY created_at DESC;')
//    .then( (result) => {
//        console.log('3')
//     //    console.log(result.rows)

    
//     return fetchCCLookUp()
//     // return result.rows;
//     })
//     .then( hope => {
//         console.log('hope')
//         console.log(hope)
//     })
}








    // const promiseArray = [db.query('SELECT * FROM reviews ORDER BY created_at DESC;', [review_id]),
    
    // return Promise.all(promiseArray)
    // .then(results => {
    //     //reject promise if :review_id is not found (result array is empty)
    // if (!results[0].rows.length) {
    //     return Promise.reject({status: 404, msg: 'ID Not Found'});
    // }   
    // results[0].rows[0].comment_count = results[1].rows.length;
    // return results[0].rows[0];
    // })
    

