var Hapi = require('hapi');
var path = require('path');
var Joi = require('joi');
//Connect to database.
var couchbase = require('couchbase');
var db = db || new couchbase.Connection({host: 'localhost:8091', bucket: 'default'});
console.log(db);
//We have a pending connection to the test database running on localhost.
//We now need to get notified if we connect successfully or if a connection error occurs:




var server = Hapi.createServer('localhost', 8000);

var logCont = { };

logCont.checkCollection = {
  //The first function will check for the existence of a Collection (A group of documents)
  handler: function(req, reply) {

  }
};


var routes = [

//Route to custom database
  {path: '/{docname}', method: 'GET', config: logCont.checkCollection}


];

server.route(routes);


server.start(function(){
  //console.log('Go to localhost:8080/');
});



module.exports = server;
