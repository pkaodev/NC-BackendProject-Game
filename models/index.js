//reviews
const {fetchReviewById, updateReviewVotes} = require('./reviews.model')
//comments

//categories
const {fetchCategories} = require('./categories.model')
//users


module.exports = {fetchReviewById, fetchCategories, updateReviewVotes};