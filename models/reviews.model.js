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
exports.fetchReviews = async (reqQuery) => {

    let queryString = `SELECT owner, title, reviews.review_id, category, review_img_url, reviews.created_at, reviews.votes, COUNT(comment_id)::int AS comment_count
                        FROM reviews
                        LEFT JOIN comments
                        ON reviews.review_id = comments.review_id
                        GROUP BY reviews.review_id`;

    const validCategories = ['social deduction', 'euro game', 'dexterity'];
    const validSortBy = ['owner', 'title', 'category', 'review_img_url', 'comment_count'];
    const validSortByReviews = ['review_id', 'created_at', 'votes'];
    
    //category
    if (reqQuery.category) {
        if (validCategories.includes(reqQuery.category)) {
            queryString += ` HAVING category = '${reqQuery.category}'`;
            //else category is not valid
        } else {
            return Promise.reject({status: 404, msg: 'Invalid Input'});
        }
    }
    
    //sort_by
    if (reqQuery.sort_by) {
        if (validSortBy.includes(reqQuery.sort_by)) {
            queryString += ` ORDER BY ${reqQuery.sort_by}`;
        } else if (validSortByReviews.includes(reqQuery.sort_by)) {
            queryString += ` ORDER BY reviews.${reqQuery.sort_by}`;
            //else sort_by is not valid
        } else {
            return Promise.reject({status: 400, msg: 'Invalid Input'});
        }
    //else default to order by created_at
    } else {
        queryString += ' ORDER BY reviews.created_at';
    }


    //order
    if (reqQuery.order) {
        if (reqQuery.order === 'ASC') {
            queryString += ' ASC';
        } else if (reqQuery.order === 'DESC') {
            queryString += ' DESC';
        //else order is not valid
        } else {
            return Promise.reject({status: 400, msg: 'Invalid Input'});
        }
    //else default to DESC
    } else {
        queryString += ' DESC';
    }

    const reviews = await db.query(queryString)

    return reviews.rows
}