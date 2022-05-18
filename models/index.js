//reviews
const {fetchReviewById, updateReviewVotes, fetchReviews} = require('./reviews.model')
//comments
const {fetchCommentsForReview, createComment} = require('./comments.model')
//categories
const {fetchCategories} = require('./categories.model')
//users
const {fetchUsers} = require('./users.model')
//utility
const {checkIfDataExists} = require('./utility.model')

module.exports = {fetchReviewById, fetchCategories, updateReviewVotes, fetchUsers, fetchReviews, fetchCommentsForReview, checkIfDataExists, createComment};