var Lab = require('lab'); //require the lab module
var server = require('../'); //require index.js
//write individual tests for your functions with Lab.experiment

//name our test units
Lab.experiment("Basic All Log Tests", function(){
    //define the tests
    Lab.test("Main endpoint list all logs at url /yourlogs/", function(done){
      var options = {
        method: 'GET',
        url: '/yourlogs/'
      };
      //server.inject lets you simulate an http request
      server.inject(options, function(response) { 
        Lab.expect(response.statusCode).to.equal(200); //Expect http response status code to be 200('OK')
        done();
      });
    });
});
