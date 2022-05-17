//reviews
const {getReviewById, patchReviewVotes} = require('./reviews.controller')
//comments

//categories
const {getCategories} = require('./categories.controller')
//users
const {getUsers} = require('./users.controller')

module.exports = {getReviewById, getCategories, patchReviewVotes, getUsers};