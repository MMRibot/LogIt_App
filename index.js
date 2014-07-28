var Hapi = require('hapi');
var path = require('path');
var Joi = require('joi');
//Connect to database.
var couchbase = require('couchbase');
var db = db || new couchbase.Connection({host: 'localhost:8091', bucket: 'default'}, function(err) {
    if (err) {
      console.log('Connection Error', err);
    } else {
      console.log('Connected!');
  }
 });
console.log(db);
//We have a pending connection to the test database running on localhost.
//We now need to get notified if we connect successfully or if a connection error occurs:




var server = Hapi.createServer('localhost', 8080);

var logCont = { };

//creat hanlder function for landing page
logCont.landingPage = {
  handler: function(req, reply){
    reply('Welcome to LogIt! Application is under construction!');
  }
};

//
// logCont.addDoc = {
//   //Add document with the setter function
//   handler: function(req, reply){
//     db.set('persons', , function(result){
//       if(err) console.error('Error: ' + err);
//       console.log(result);
//     });
//   }
// };

// logCont.fetchDoc = {
//   handler: function(req, reply){
//     var fname = req.params.name;
//     db.get('persons', fname, function(result){
//       if(err) console.log('Error: ' + err);
//         return reply(Hapi.message('Hello ' + fname));
//     });
//   }
// };


var routes = [

//Route to custom database
  {path: '/', method: 'GET', config: logCont.landingPage},
//  {path: '/addUser', method: 'POST', config: logCont.addDoc},
//  {path: '/{name}', method: 'GET', config: logCont.fetchDoc}
];

server.route(routes);


server.start(function(){
  console.log('Go to localhost:8080/');
});



module.exports = server;
