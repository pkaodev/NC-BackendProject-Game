const {fetchUsers} = require('../models')

//#6
exports.getUsers = (req, res, next) => {
    fetchUsers().then(users => {
        res.status(200).send({users})
    })
    .catch(next)
}