const {fetchCategories} = require('./models')




//#3
exports.getCategories = (req, res, next) => {
    fetchCategories().then(receivedData => {
        res.status(200).send(receivedData)
    })
    .catch(err => {
        next(err)
    })
}



