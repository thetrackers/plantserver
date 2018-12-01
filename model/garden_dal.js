var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {

    var query = 'SELECT * FROM garden';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function (garden_id, callback) {
    var query = 'CALL garden_getinfo(?)';

    var queryData = [garden_id];


    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};