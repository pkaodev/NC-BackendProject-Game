const {fetchCommentsForReview, createComment} = require('../models')

//#9
exports.getCommentsForReview = (req, res, next) => {
    fetchCommentsForReview(req.params)
    .then( (comments) => {
        res.status(200).send({comments});
    })
    .catch(next)

}

//#10
exports.postComment = (req, res, next) => {
    //add asyncs
    // const comment = await createComment(req.params, req.body)
    // res.status(201).send({comment})

    createComment(req.params, req.body)
    .then ( (comment) => {
        res.status(201).send({comment})
    })
    .catch(next)

}