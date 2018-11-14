var express = require('express');
var router = express.Router();

var user_dal = require('../model/user_dal');
//var reading_dal = require('../model/reading_dal');

/* GET users listing. */
router.get('/all', function(req, res, next) {
  user_dal.getAll(function (err, result) {
      if(err) {
          res.send(err);
      }
      else {
          //res.render('player/playerViewAll2', { 'result':result });
          //var user = result[0].first_name + ' ' + result[0].last_name;
          res.send({'users':result});
          //res.send(result);
      }
  })
});

// View the user for the given user_id
router.get('/', function (req, res) {
    if (req.query.user_id == null) {
        res.send('user_id is null');
    }
    else {
        user_dal.getById(req.query.user_id, function(err, result) {
            if (err) {
                res.send(err);
            }
            else {
                // obj['theTeam'].push({"teamId":"4","status":"pending"});
                // jsonStr = JSON.stringify(obj);

                /*var JSONstr = JSON.stringify(result[0][0]); //user info for given id
                var JSONobj = JSON.parse(JSONstr); //user object

                JSONobj['myGardens'] = result[1];*/

                var userObj = JSON.parse(JSON.stringify(result[0][0]));
                var gardenArray = result[1]; //get each garden for user, ex 2 gardens for user id 1
                var zoneArray = result[2];
                var sensorArray = result[3];
                var readingArray = result[4];

                //for each garden, make JSONObject, add zone array to each
                var gardenObjectArray = [];
                for (i in gardenArray) {

                    var gardenStr = JSON.stringify(gardenArray[i]);
                    var gardenObj = JSON.parse(gardenStr);

                    //for each zone, make JSONObject, add sensor array to each
                    var zoneObjectArray = [];
                    for (j in zoneArray) {

                        var zoneStr = JSON.stringify(zoneArray[j]);
                        var zoneObj = JSON.parse(zoneStr);


                        if (zoneObj.garden_id == gardenObj.garden_id) {
                            //zoneObjectArray.push(zoneObj);

                            var sensorObjectArray = [];
                            for (k in sensorArray) {

                                var sensorStr = JSON.stringify(sensorArray[k]);
                                var sensorObj = JSON.parse(sensorStr);

                                if (sensorObj.zone_id == zoneObj.zone_id) {
                                    //sensorObjectArray.push(sensorObj);

                                    var readingObjectArray = [];
                                    for (l in readingArray) {

                                        var readingStr = JSON.stringify(readingArray[l]);
                                        var readingObj = JSON.parse(readingStr);

                                        if (readingObj.sensor_id == sensorObj.sensor_id) {
                                            readingObjectArray.push(readingObj);
                                        }

                                        else {
                                            //move to next reading
                                        }
                                    }
                                    //after checking each reading, add the reading array to the sensor object
                                    sensorObj['myReadings'] = readingObjectArray;
                                    sensorObjectArray.push(sensorObj);
                                }
                                else {
                                    //move to next sensor
                                }
                            }
                            //after checking each sensor, add the sensor array to the zone object
                            zoneObj['mySensors'] = sensorObjectArray;
                            zoneObjectArray.push(zoneObj);
                        }
                        else {
                            //move to next zone
                        }
                    }
                    //after checking each zone, add the zone array to the garden object
                    gardenObj['myZones'] = zoneObjectArray;
                    gardenObjectArray.push(gardenObj);
                }
                //after checking each garden, add the garden array to the user object
                userObj['myGardens'] = gardenObjectArray;

                res.send(userObj);
            }
        });
    }
});

// Insert a user (firstname, lastname, contact number)
// if POST method, change req to body!! *post not working
router.get('/insert', function (req, res) {
    if (req.query.first_name  == null || req.query.last_name  == null || req.query.contact_number == null ) {
        res.send('Missing first name, last name, or contact number!')
    }
    else {
        //insert the user into database
        user_dal.insert(req.query, function (err, result) {
           if (err) {
               res.send(err);
           }
           else {
               res.send('Successfully added!\nWelcome ' + req.query.first_name + ' ' + req.query.last_name + '!\n' +'Your' +
                   ' number is: ' + req.query.contact_number);
           }
        });
    }
});


module.exports = router;
