var Lab = require('lab'); //require the lab module
var server = require('../'); //require index.js
//write individual tests for your functions with Lab.experiment


//name our test units
Lab.experiment("LogIt Tests", function(){
    //define the tests

    //Test for the existence of a Collection
    Lab.test("Verify existence of a Collection - FAIL", function(done){
      var options = {
        method: 'GET',
        url: '/test'
      };
      //server.inject lets you simulate an http request
      //For our first test we do not have any documents in the databse.
      server.inject(options, function(response) {
        Lab.expect(response.statusCode).to.equal(404);//Expect http response status code to be 404(Not Found)
        Lab.expect(response.result.value).to.equal(undefined);//there is no collection at the time
      done();
      });
    });

    //Test for creation of database
    // Lab.test("Test creation of bucket.", function(done){
    //   var options = {
    //     method: 'GET',
    //     url: '/Logs'
    //   };
    //   //server.inject lets you simulate an http request
    //   //For our first test we do not have any documents in the databse.
    //   server.inject(options, function(response) {
    //     Lab.expect(response.statusCode).to.equal(200);//created a bucket(code 201)
    //     Lab.expect(response.result.message).to.equal('Database Logs created with success!');
    //   done();
    //   });
    // });


});
