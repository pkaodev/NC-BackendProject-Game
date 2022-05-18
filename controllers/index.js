//reviews
const {getReviewById, patchReviewVotes, getReviews} = require('./reviews.controller')
//comments
const {getCommentsForReview, postComment} = require('./comments.controller')
//categories
const {getCategories} = require('./categories.controller')
//users
const {getUsers} = require('./users.controller')

module.exports = {getReviewById, getCategories, patchReviewVotes, getUsers, getReviews, getCommentsForReview, postComment};