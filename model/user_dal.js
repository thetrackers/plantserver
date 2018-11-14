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

exports.getById = function (user_id, callback) {
    var query = 'CALL user_getinfo(?)';

    var queryData = [user_id];


    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function (params, callback) {
  var query = 'INSERT INTO user (first_name, last_name, contact_number) VALUES (?,?,?)';

  var queryData = [params.first_name, params.last_name, params.contact_number];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
