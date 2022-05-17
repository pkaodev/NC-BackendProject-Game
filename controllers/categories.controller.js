const {fetchCategories} = require('../models')

//#3
exports.getCategories = (req, res, next) => {
    fetchCategories().then(categories => {
        res.status(200).send({categories})
    })
    .catch(next)
}