var path = require('path');
var friend = require('../data/friend');

module.exports = function(app) {
    app.get('/api/friends', (req, res) => {
        res.json(friend);
    })

    app.post('/api/friends', (req, res) => {
        friend.push(req.body);
        res.json(true);
    })
}