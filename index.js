var Hapi = require('hapi');
var path = require('path');
var Joi = require('joi');
var couchbase = require('couchbase').Mock;
var db = new couchbase.Connection();


var server = Hapi.createServer('localhost', 8000);

var logCont = { };

logCont.checkDb = {
  //The first function will check for the existence of a database
  handler: function(req, reply) {
      bucket.get('default', function(err, result){
        if(err) {
          console.log(err);
          console.dir(err);
        } else {
        return result;
        }
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
