var Lab = require('lab'); //require the lab module
var server = require('../'); //require index.js
//write individual tests for your functions with Lab.experiment


//name our test units
Lab.experiment("LogIt Tests", function(){
    //define the tests
    //Comment out this test to test the FAIL!
    // Lab.test("Test connection to databse - PASS", function(done){
    //   var options = {
    //     url: 'mongodb://localhost/test'
    //   };
    //
    //   server.inject(options, function(response){
    //     Lab.expect(response.statusCode).to.equal(200);
    //     done();
    //   });
    // });

    //Comment out this test to test PASS!
    Lab.test("Test connection to databse - FAIL", function(done){
      var options = {
        url: 'mongodb://localhost/test'
      };

      server.inject(options, function(response){
        Lab.expect(response.statusCode).to.equal(404);
        done();
      });
    });


    //Test for existence of database
    // Lab.test("Verify existence of connection && bucket.", function(done){
    //   var options = {
    //     method: 'GET',
    //     url: '/Logs'
    //   };
    //   //server.inject lets you simulate an http request
    //   //For our first test we do not have any documents in the databse.
    //   server.inject(options, function(response) {
    //     Lab.expect(response.statusCode).to.equal(200);//Expect http response status code to be 200('OK'). There is a connection
    //     Lab.expect(response.result.value).to.equal(undefined);//there is no buecket so it returns undefined
    //   done();
    //   });
    // });

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
