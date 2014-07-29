var Hapi = require('hapi');
var path = require('path');
var Joi = require('joi');
//Connect to database.
var couchbase = require('couchbase');
var db = db || new couchbase.Connection({host: 'localhost:8091', bucket: 'beer-sample'}, function(err) {//using the beer-sample bucket
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
    reply ('Welcome to LogIt! Application is under construction!');
  }
};

//
//logCont.addDoc = {
  //Add document with the setter function
//   handler: function(req, reply){
//
//     var payload = {
//       "personId": "Nuno",
//       "Date": {"type": "date", "default": "Date.now"},
//       "musclegroup": "Arms",
//       "exercise": "Bicep Curl",
//       "sets": [
//         {"reps": "10", "Kg": "20"},
//         {"reps": "11", "Kg": "30"}
//       ]
//     };
//
//     db.set("personId", payload , function(result){
//       if(err) console.error('Error: ' + err);
//       console.log(result);
//       reply ("Log added successfully!");
//     });
//   }
// };

logCont.fetchDoc = {
  handler: function(req, reply){
    var fname = req.params.name;
    db.get(fname,  function(err, result){
      if(err) console.log('Error: ' + err);
        console.log(result.value.name);
        return reply("Your request to " + fname + " :" + "<br> City: " + result.value.city + "<br> State: " + result.value.state + "<br>Country: " + result.value.country);
    });
  }
};


var routes = [

//Route to custom database
  {path: '/', method: 'GET', config: logCont.landingPage},
///  {path: '/addLog', method: 'POST', config: logCont.addDoc},
  {path: '/{name}', method: 'GET', config: logCont.fetchDoc}
];

server.route(routes);


server.start(function(){
  console.log('Go to localhost:8080/');
});



module.exports = server;
