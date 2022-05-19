const {reallyGetAPI} = require('../models')

exports.getAPI = (req, res, next) => {
    reallyGetAPI()
    .then( directory => {
        res.status(200).send({directory})
    })
    .catch(next)
}