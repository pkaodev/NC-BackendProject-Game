const {fetchReviewById} = require('../models')

//#4
exports.getReviewById = (req, res, next) => {
    fetchReviewById(req.params).then(review => {
        res.status(200).send({review})
    })
    .catch(err => {
        next(err)
    })
}