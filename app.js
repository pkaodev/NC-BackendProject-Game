const express = require('express');

//import controllers
const {getCategories, getReviewById, patchReviewVotes, getUsers, getReviews, getCommentsForReview, postComment, deleteComment} = require('./controllers');

const app = express();
app.use(express.json());

//#3 Responds with an array of category objects with slug and description properties
app.get('/api/categories', getCategories);

//#4
app.get('/api/reviews/:review_id', getReviewById);

//#5
app.patch('/api/reviews/:review_id', patchReviewVotes);

//#6
app.get('/api/users', getUsers);

//#8
app.get('/api/reviews', getReviews);

//#9
app.get('/api/reviews/:review_id/comments', getCommentsForReview);

//#10
app.post('/api/reviews/:review_id/comments', postComment);

//#12
app.delete('/api/comments/:comment_id', deleteComment);





//ERROR HANDLERS - move to own file

//error handler for incorrect url (404: Route not found)
app.all('/*', (req, res) => {
    res.status(404).send({msg: 'Route not found'});
  });


// error  helper
// app.use((err, req, res, next) => {
//     console.log('ERROR HELP IS HERE!')
//     console.log(err)
//     next(err)
// })


//error handler for postgres errors
app.use((err, req, res, next) => {
    switch (err.code) {
        case '22P02':
            res.status(400).send({msg: 'Invalid Input'});
        case '23502':
            res.status(400).send({msg: 'Invalid Input'});
        case '23503':
            res.status(400).send({msg: 'Invalid Input'});
        case '42601':
            res.status(400).send({msg: 'Invalid Input'});
        case '42703':
            res.status(400).send({msg: 'Invalid Input'});

        }
    next(err)
})

  
//error handler for personalised errors
app.use((err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({msg: err.msg});
    }
    next(err)
})

//final error handler (500: Server error)
app.use((err, req, res, next) => {
    res.status(500).send({msg: 'Server error'});
})

module.exports = app;