var Hapi = require('hapi');
var path = require('path');
var Joi = require('joi');
//Connect to database.
var couchbase = require('couchbase');
var cluster = new couchbase.Cluster();
var db = db || cluster.openBucket('default');//check to see if we have a connection. If there is none, created one!


var server = Hapi.createServer('localhost', 8000);

var logCont = { };

logCont.checkDb = {
  //The first function will check for the existence of a database
  handler: function(req, reply) {
      var bucketName = req.params.dbname;
      db.get(bucketName, function(err, result){
        console.log(result);
        return result;
      });
      return reply(result);
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
