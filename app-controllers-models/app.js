const express = require('express');

const {getCategories} = require('./controllers');

const app = express();

app.use(express.json());

//#3 Responds with an array of category objects with slug and description properties
app.get('/api/categories', getCategories)


//error handler for incorrect url (404: Route not found)
app.all('/*', (req, res) => {
    res.status(404).send('404: Route not found');
  });


//final error handles (500: Server error)
app.use((err, req, res, next) => {
    res.status(500).send('500: Server error')
})

// testing with insomnia
// app.listen(12345, (err) => {
//     if (err) console.log(err);
//     else console.log("Listening on port 12345.....");
//   });  

module.exports = app;