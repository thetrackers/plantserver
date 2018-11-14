var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {

    var query = 'SELECT *, u.contact_number FROM reading r\n' +
        'LEFT JOIN sensor s ON s.sensor_id = r.sensor_id\n' +
        'LEFT JOIN zone z ON z.zone_id = s.zone_id\n' +
        'LEFT JOIN garden g ON g.garden_id = z.garden_id\n' +
        'LEFT JOIN user u ON u.user_id = g.user_id\n' +
        'WHERE r.validated = 0';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};


exports.updateSentTextToTrue = function (reading_id, callback) {

    var query = 'UPDATE reading SET validated = TRUE WHERE reading_id = ?';

    connection.query(query, reading_id, function(err, result) {
        callback(err, result);
    });
};
