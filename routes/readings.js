var express = require('express');
var router = express.Router();

//var user_dal = require('../model/user_dal');
var reading_dal = require('../model/reading_dal');

/* GET reading listing. */
router.get('/all', function(req, res, next) {
    reading_dal.getAll(function (err, result) {
        if(err) {
            res.send(err);
        }
        else {
            //res.render('player/playerViewAll2', { 'result':result });
            //var user = result[0].first_name + ' ' + result[0].last_name;
            res.send({'readings':result});
            //res.send(result);
        }
    })
});

/* update reading.sentText to true for given reading_id */
router.get('/update', function(req, res, next) {
    if (req.query.reading_id == null) {
        res.send('Missing reading id');
    }
    else {
        reading_dal.updateSentTextToTrue(req.query.reading_id, function (err, result) {
            if(err) {
                res.send(err);
            }
            else {
                res.send(result);
                console.log('Successfully updated VALIDATED for ' + req.query.reading_id);
            }
        })
    }
});

module.exports = router;
