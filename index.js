var Hapi = require('hapi');
var path = require('path');
var Joi = require('joi');
//Connect to database.
var couchbase = require('couchbase');
var db = db || new couchbase.Connection({host: 'localhost:8091', bucket: 'default'});
//check to see if we have a connection. If there is none, created one!


var server = Hapi.createServer('localhost', 8000);

var logCont = { };

logCont.checkDb = {
  //The first function will check for the existence of a database
  handler: function(req, reply) {
      db.get(req.params.dbname, function(err, result){
        console.log(result);
        return reply(result);
      });
    }
};


var routes = [

//Route to custom database
  {path: '/{dbname}', method: 'GET', config: logCont.checkDb}


];

server.route(routes);


server.start(function(){
  console.log('Go to localhost:8080/');
});



module.exports = server;
