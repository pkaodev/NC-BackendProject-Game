//reviews
const {getReviewById, patchReviewVotes, getReviews} = require('./reviews.controller')
//comments

//categories
const {getCategories} = require('./categories.controller')
//users
const {getUsers} = require('./users.controller')

module.exports = {getReviewById, getCategories, patchReviewVotes, getUsers, getReviews};