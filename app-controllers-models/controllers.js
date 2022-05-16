const {fetchCategories, fetchReviewById} = require('./models')




//#3
exports.getCategories = (req, res, next) => {
    fetchCategories().then(receivedData => {
        res.status(200).send(receivedData)
    })
    .catch(next)
}

//#4
exports.getReviewById = (req, res, next) => {
    fetchReviewById(req.params).then(review => {
        res.status(200).send({review})
    })
    .catch(err => {
        next(err)
    })
}


