var express = require('express');
var router = express.Router();

var garden_dal = require('../model/garden_dal');


/* GET users listing. */
router.get('/all', function(req, res, next) {
  garden_dal.getAll(function (err, result) {
      if(err) {
          res.send(err);
      }
      else {
          //res.render('player/playerViewAll2', { 'result':result });
          //var user = result[0].first_name + ' ' + result[0].last_name;
          res.send({'gardens':result});
          //res.send(result);
      }
  })
});

// View the user for the given user_id
router.get('/', function (req, res) {
    if (req.query.garden_id == null) {
        res.send('garden_id is null');
    }
    else {
        garden_dal.getById(req.query.garden_id, function(err, result) {
            if (err) {
                res.send(err);
            }
            else {
                //res.send({'garden':result})
                var gardenObj = JSON.parse(JSON.stringify(result[0][0]));
                var zoneArray = result[1];
                var sensorArray = result[2];
                var readingArray = result[3];

                //for each zone, make JSONObject, add sensor array to each
                var zoneObjectArray = [];
                for (i in zoneArray) {

                    var zoneStr = JSON.stringify(zoneArray[i]);
                    var zoneObj = JSON.parse(zoneStr);

                    //for each sensor, make JSONObject, add reading array to each
                    var sensorObjectArray = [];
                    for (j in sensorArray) {

                        var sensorStr = JSON.stringify(sensorArray[j]);
                        var sensorObj = JSON.parse(sensorStr);


                        if (sensorObj.zone_id == zoneObj.zone_id) {
                            //sensorObjectArray.push(sensorObj);

                            var readingObjectArray = [];
                            for (k in readingArray) {

                                var readingStr = JSON.stringify(readingArray[k]);
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
                //after checking each zone, add the zone array to the garden object
                gardenObj['myZones'] = zoneObjectArray;

                res.send(gardenObj);
            }
        });
    }
});
module.exports = router;
