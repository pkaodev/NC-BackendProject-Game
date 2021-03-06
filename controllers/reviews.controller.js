const {fetchReviewById, updateReviewVotes, fetchReviews} = require('../models')
const {fetchCommentsCount} = require('../models')

//#4, 7
exports.getReviewById = (req, res, next) => {
    fetchReviewById(req.params)
    .then( (review) => {

        res.status(200).send({review})
    })
    .catch(next)
}

//#5
exports.patchReviewVotes = (req, res, next) => {
    updateReviewVotes(req.params, req.body)
    .then( () => {
        return fetchReviewById(req.params)
    })
    .then( (review) => {
        res.status(200).send({review})
    })
    .catch(next)
}

//#8
exports.getReviews = (req, res, next) => {
    fetchReviews(req.query).then(reviews => {
        res.status(200).send({reviews});
    })
    .catch(next)
}