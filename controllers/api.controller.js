const {reallyGetAPI} = require('../models')

exports.getAPI = (req, res, next) => {
    reallyGetAPI()
    .then( directory => {
        console.log({directory})
        res.status(200).send({directory})
    })
    .catch(next)
}