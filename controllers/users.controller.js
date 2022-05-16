const {fetchUsers} = require('../models')

//#6
exports.getUsers = (req, res, next) => {
    fetchUsers().then(receivedData => {
        res.status(200).send(receivedData)
    })
    .catch(next)
}