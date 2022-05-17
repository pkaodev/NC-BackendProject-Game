const {fetchReviewById} = require('../models')

//#4
exports.getReviewById = (req, res, next) => {
    fetchReviewById(req.params).then(review => {
        res.status(200).send({review})
    })
    .catch(next)
}

//#5
//refactor promise chain
exports.patchReviewVotes = (req, res, next) => {
    updateReviewVotes(req.params, req.body)
    .then(() => {
        return fetchReviewById(req.params)
    })
    .then(review => {
        res.status(200).send({review})
    })
    .catch(next)
}