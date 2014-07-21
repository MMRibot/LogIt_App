var Hapi = require('hapi');
var path = require('path');
var Joi = require('joi');
var cradle = require('cradle'); //we require the cradle framework that works with couchdb
var db = new(cradle.Connection)(); //set a connection to couchDb

var server = Hapi.createServer('localhost', 8080);

logCont = { };

logCont.checkDb = {
  //The first function will check for the existence of a database
  handler: function(req, reply) {
  db.exists(function (err, exists) {
      if (!exists) {
        console.log('The requested database does not exist.');
        reply('The requested database does not exist.');
        db.create(req.params.dbname);
        return reply('New database ' + req.params.dbname + ' created!');
      } else if(exists) {
        console.log('Database ' + req.params.dbname + ' exists.');
        return reply('Database ' + req.params.dbname + ' found!');
      }
    });
  },
  //make sure that our databse name will be of the alphanumerical type
  validate: {
    params: { id:Joi.string().alphanum().min(4).max(15)}
  }
};


var routes = [

//Route to custom database
  {path: '/{req.params.dbname}/', method: 'GET', config: logCont.checkDb}


];




module.exports = server;
