var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {

    var query = 'SELECT * FROM user';
    //var query = 'SELECT * FROM plant_tracker';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.updateHighTempThreshold = function (zone_id, value, callback) {
    var query = 'UPDATE zone SET highTempThreshold = ? WHERE zone_id = ?';

    var queryData = [value, zone_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.updateLowTempThreshold = function (zone_id, value, callback) {
    var query = 'UPDATE zone SET lowTempThreshold = ? WHERE zone_id = ?';

    var queryData = [value, zone_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.updateHighHumidityThreshold = function (zone_id, value, callback) {
    var query = 'UPDATE zone SET highHumidityThreshold = ? WHERE zone_id = ?';

    var queryData = [value, zone_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.updateLowHumidityThreshold = function (zone_id, value, callback) {
    var query = 'UPDATE zone SET lowHumidityThreshold = ? WHERE zone_id = ?';

    var queryData = [value, zone_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
