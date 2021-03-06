//reviews
const {fetchReviewById, updateReviewVotes, fetchReviews} = require('./reviews.model')
//comments
const {fetchCommentsForReview, createComment, removeComment} = require('./comments.model')
//categories
const {fetchCategories} = require('./categories.model')
//users
const {fetchUsers} = require('./users.model')
//utility
const {checkIfDataExists} = require('./utility.model')
//api
const {reallyGetAPI} = require('./api.model')

module.exports = {fetchReviewById, fetchCategories, updateReviewVotes, fetchUsers, fetchReviews, fetchCommentsForReview, checkIfDataExists, createComment, removeComment, reallyGetAPI};