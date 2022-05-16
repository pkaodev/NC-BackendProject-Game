const express = require('express');

const {getCategories, getReviewById} = require('./controllers');

const app = express();

//potentially useful later on
// app.use(express.json());

//#3 Responds with an array of category objects with slug and description properties
app.get('/api/categories', getCategories)

//#4
app.get('/api/reviews/:review_id', getReviewById)


//error handler for incorrect url (404: Route not found)
app.all('/*', (req, res) => {
    res.status(404).send({msg: '404: Route not found'});
  });

//error handler for personalised errors
app.use((err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({msg: err.msg})
    }
    next(err)
})

//final error handler (500: Server error)
app.use((err, req, res, next) => {
    res.status(500).send({msg: '500: Server error'});
})

module.exports = app;