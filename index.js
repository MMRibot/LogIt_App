var Hapi = require('hapi');
var path = require('path');
var Joi = require('joi');
//Connect to database.
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

//We have a pending connection to the test database running on localhost.
//We now need to get notified if we connect successfully or if a connection error occurs:
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));



var server = Hapi.createServer('localhost', 8000);

var logCont = { };

// logCont.checkDb = {
//   //The first function will check for the existence of a database
//   handler: function(req, reply) {
//
//       });
//     }
// };
//
//
// var routes = [
//
// //Route to custom database
//   {path: '/{dbname}', method: 'GET', config: logCont.checkDb}
//
//
// ];
//
// server.route(routes);


server.start(function(){
  //console.log('Go to localhost:8080/');
});



module.exports = server;
