//reviews
const {fetchReviewById, updateReviewVotes, fetchReviews} = require('./reviews.model')
//comments
const {fetchCommentsCount, fetchCCLookUp} = require('./comments.model')
//categories
const {fetchCategories} = require('./categories.model')
//users
const {fetchUsers} = require('./users.model')

module.exports = {fetchReviewById, fetchCategories, updateReviewVotes, fetchUsers, fetchReviews, fetchCommentsCount, fetchCCLookUp};