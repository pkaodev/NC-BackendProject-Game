//reviews
const {getReviewById, patchReviewVotes, getReviews} = require('./reviews.controller')
//comments
const {getCommentsForReview, postComment, deleteComment} = require('./comments.controller')
//categories
const {getCategories} = require('./categories.controller')
//users
const {getUsers} = require('./users.controller')
//API
const {getAPI} = require('./api.controller')

module.exports = {getReviewById, getCategories, patchReviewVotes, getUsers, getReviews, getCommentsForReview, postComment, deleteComment, getAPI};