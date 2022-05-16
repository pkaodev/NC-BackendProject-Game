//reviews
const {getReviewById, patchReviewVotes} = require('./reviews.controller')
//comments

//categories
const {getCategories} = require('./categories.controller')
//users


module.exports = {getReviewById, getCategories, patchReviewVotes};