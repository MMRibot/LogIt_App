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


logCont.addDoc = {
  //Add document with the setter function
  handler: function(req, reply){
    db.set("persons", {"FirstName": "Mario"}, function(result){
      if(err) console.error('Error: ' + err);
      console.log(result);
    });
  }
};


var routes = [

//Route to custom database
  {path: '/userCreator', method: 'POST', config: logCont.addDoc}

];

server.route(routes);


server.start(function(){
  //console.log('Go to localhost:8080/');
});



module.exports = server;
