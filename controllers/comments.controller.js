const {fetchCommentsForReview} = require('../models')

//#9
exports.getCommentsForReview = (req, res, next) => {
    fetchCommentsForReview(req.params)
    .then( (comments) => {
        res.status(200).send({comments});
    })
    .catch(next)

}