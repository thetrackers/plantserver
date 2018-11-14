var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

//////////////////////////////////////////////////////
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var readingRouter = require('./routes/readings');
//////////////////////////////////////////////////////

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

////////////////////////////////////////////////////
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reading', readingRouter);
///////////////////////////////////////////////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//////CHECK EVERY 'time' SECONDS DATABASE FOR EVENT////////////////////

var bodyResponse; //response from GET request
var time = 10000; // 1s = 1000ms seconds, ideally every 30 minutes? or 1 hour?

var requestLoop = setInterval(function() {
    //console.log('pizza'); print pizza every 'time' seconds

    //request
    var request = require('request');

    request('http://localhost:3000/reading/all', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // log body

        var listOfReadings = JSON.parse(body); //get response into JSON Object
        console.dir(listOfReadings); //display as JSON to console

        var readingArray = listOfReadings.readings; // Get array from listUsers

        if (readingArray === undefined || readingArray.length == 0) {
            console.log('Reading array empty')
        }

        else { //if reading array not empty, check if each reading passes threshold

            for (i in readingArray) {

                var reading = readingArray[i]; // assign the user

                if (reading.temperature > 110 ) { // send text message if event found, change 110 to THRESHOLD (high or low)

                    console.log('RISK FOUND... sending text message!');
                    SendText(reading);
                }
                else { //if no risk is found validate reading as checked
                    console.log('Did not find a risk... validating');
                    validateReading(reading);
                }
            }
        }
    });
}, time);

function SendText (reading) {
    //Send a text to alert user, and validate reading

    // 2 PEOPLE SHOULD BE ABLE TO GET A MESSAGE??

    // start text message
    const Nexmo = require('nexmo');
    const nexmo = new Nexmo({
        apiKey: 'f284bb51',
        apiSecret: 'Lylv5p5Le3wHGFiC'
    });

    //FORMAT OF TEXT
    //

    nexmo.message.sendSms('17205499623', reading.contact_number, 'Risk found at ' + reading.name_of, function (err, result) {

        if (err) {
            console.log(err);
        }
        else { // if message was successfully sent...

            console.dir(result);
            // change validate to 1 to signify that reading was checked and we sent the text to user
            // UPDATE reading SET validate = TRUE WHERE reading_id = ?;

            //request
            var request = require('request');
            request('http://localhost:3000/reading/update?reading_id=' + reading.reading_id, function (error, response, body) {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('body:', body); // log body
            });
        }
    });
    // end text message
}

function validateReading (reading) {
    // change validate to 1 to signify that reading was checked but no alert was needed to be sent to user
    // UPDATE reading SET validate = TRUE WHERE reading_id = ?;

    //request
    var request = require('request');
    request('http://localhost:3000/reading/update?reading_id=' + reading.reading_id, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // log body
    });
}
//////////////END CHECK//////////////////////////////////////////

module.exports = app;
