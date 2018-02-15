var path = require('path');

module.exports = function(app) {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../../app/public/home.html'));
    })

    app.get('/survey', (req, res) => {
        res.sendFile(path.join(__dirname, '../../app/public/survey.html'));
    })
}