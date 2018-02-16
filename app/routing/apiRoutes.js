var path = require('path');
var friends = require('../data/friend');

function getDiffScore(scoreArrUser1, scoreArrUser2, cb) {
    // console.log(scoreArrUser1, scoreArrUser2);
    var diffScore = 0;
    for (i = 0; i < scoreArrUser1.length; i++) {
        // console.log('In For loop');
        // console.log(parseInt(scoreArrUser1[i]) - parseInt(scoreArrUser2[i]));
        diffScore = Math.abs(parseInt(scoreArrUser1[i]) - parseInt(scoreArrUser2[i])) + diffScore;
        // console.log(diffScore);
    }
    // console.log('inside func: '+diffScore)
    cb(diffScore);
    return diffscore;
}

function getMinDiffUser(arr, prop) {
    var min;
    for (var i = 0; i < arr.length; i++) {
        // console.log(arr[i][prop]);
        // console.log(parseInt(min[prop]));
        if (!min || parseInt(arr[i][prop]) < parseInt(min[prop])) {
            // console.log('-----')
            // console.log(parseInt(arr[i][prop]));
            // console.log(parseInt(min[prop]));

            // console.log('-----')
            min = arr[i];
        }
    }
    return min;
}

module.exports = function (app) {
    app.get('/api/friends', (req, res) => {
        res.json(friends);
    })

    app.post('/api/friends', (req, res) => {
        var friendsComptibility = [];
        var currentuser = req.body;
        var currentUserPosition;
        // console.log("*****")
        // console.log(currentuser, currentuser["scores[]"])
        // console.log("*****")
        friends.push(currentuser);
        friends.forEach(function (item, index) {
            if (item.name === currentuser.name) {
                currentUserPosition = index;
            } else {
                friendsComptibility.push({
                    name: item.name,
                    diffscore: getDiffScore(currentuser["scores[]"], item["scores[]"], function (result) {
                        diffscore = result
                    }),
                    photo: item.photo
                })
            }
        })
        // console.log(friendsComptibility);
        // console.log(getMinDiffUser(friendsComptibility, "diffscore"));
        // res.json(true);
        if (getMinDiffUser(friendsComptibility, "diffscore")) {
            res.json(getMinDiffUser(friendsComptibility, "diffscore"));
        } else {
            res.json(true);
        }

    })
}