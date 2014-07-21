var Lab = require('lab'); //require the lab module
var server = require('../'); //require index.js
//write individual tests for your functions with Lab.experiment

//name our test units
Lab.experiment("LogIt Tests", function(){
    //define the tests
    Lab.test("List all logs at url /Logs", function(done){
      var options = {
        method: 'GET',
        url: '/Logs/'
      };
      //server.inject lets you simulate an http request
      //For our first test we do not have any documents in the databse.
      server.inject(options, function(response) {
        Lab.expect(response.statusCode).to.equal(404);//Expect http response status code to be 404('Not Found')
      done();
      });
    });


});
