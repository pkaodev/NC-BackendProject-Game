const fs = require('fs.promises')

exports.reallyGetAPI = () => {
    return fs.readFile('./endpoints.json', 'utf-8')
    .then( theFile => {
        return JSON.parse(theFile);
    })
}