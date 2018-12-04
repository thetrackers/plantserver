var express = require('express');
var router = express.Router();

var zone_dal = require('../model/zone_dal');

/* GET reading listing. */
router.get('/all', function(req, res, next) {

});

/* update reading.sentText to true for given reading_id */
router.get('/updateThreshold', function(req, res, next) {
    if (req.query.zone_id == null) {
        res.send('Missing reading id');
    }
    else if (req.query.type_id == null) {
        res.send('Missing type id');
    }
    else if (req.query.value == null) {
        res.send('Missing value for type');
    }
    else {
        if (req.query.type_id == 1) {

            zone_dal.updateHighTempThreshold(req.query.zone_id, req.query.value, function (err, result) {
                if (err) {
                    res.send(err);
                }
                else {
                    console.log(result);
                    res.send('Successfully updated Zones high temp threshold for Zone_id = ' + req.query.zone_id + ' with value ' + req.query.value);
                    console.log('Successfully updated Zones high temp threshold for Zone_id = ' + req.query.zone_id + ' with value ' + req.query.value);
                }
            })
        }
        else if (req.query.type_id == 2) {
            zone_dal.updateLowTempThreshold(req.query.zone_id, req.query.value, function (err, result) {
                if (err) {
                    res.send(err);
                }
                else {
                    console.log(result);
                    res.send('Successfully updated Zones low temp threshold for Zone_id = ' + req.query.zone_id + ' with value ' + req.query.value);
                    console.log('Successfully updated Zones low temp threshold for Zone_id = ' + req.query.zone_id + ' with value ' + req.query.value);
                }
            })
        }
        else if (req.query.type_id == 3) {
            zone_dal.updateHighHumidityThreshold(req.query.zone_id, req.query.value, function (err, result) {
                if (err) {
                    res.send(err);
                }
                else {
                    console.log(result);
                    res.send('Successfully updated Zones high humidity threshold for Zone_id = ' + req.query.zone_id + ' with value ' + req.query.value);
                    console.log('Successfully updated Zones high humidity threshold for Zone_id = ' + req.query.zone_id + ' with value ' + req.query.value);
                }
            })
        }
        else if (req.query.type_id == 4) {
            zone_dal.updateLowHumidityThreshold(req.query.zone_id, req.query.value, function (err, result) {
                if (err) {
                    res.send(err);
                }
                else {
                    console.log(result);
                    res.send('Successfully updated Zones low humidity threshold for Zone_id = ' + req.query.zone_id + ' with value ' + req.query.value);
                    console.log('Successfully updated Zones low humidity threshold for Zone_id = ' + req.query.zone_id + ' with value ' + req.query.value);
                }
            })
        }
    }
});

module.exports = router;
