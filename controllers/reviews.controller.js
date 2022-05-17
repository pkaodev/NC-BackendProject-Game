const {fetchReviewById, updateReviewVotes, fetchReviews} = require('../models')
const {fetchCommentsCount} = require('../models')

//#4, 7
exports.getReviewById = (req, res, next) => {
    Promise.all([fetchReviewById(req.params), fetchCommentsCount(req.params)])
    .then( (review1commentsCount2) => {
        const review = review1commentsCount2[0][0];
        review.comment_count = review1commentsCount2[1];
        res.status(200).send({review})
    })
    .catch(next)
}

//refactor above and below + fetchReviewById model to return complete object by invoking uprdateReviewVotes model

//#5
exports.patchReviewVotes = (req, res, next) => {
    
    Promise.all([updateReviewVotes(req.params, req.body), fetchReviewById(req.params)])
    .then ( (votes1review2) => {
        const review = votes1review2[1][0];
        review.votes = votes1review2[0];
        res.status(200).send({review})
    })
    .catch(next)
}

//#8
exports.getReviews = (req, res, next) => {
    fetchReviews().then(reviews => {
        res.status(200).send({reviews});
    })
    .catch(next)
}