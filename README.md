*I will be building a minimalistic Log application using the awesome NodeJs framework,
HapiJs, developed by Walmart Labs.*

*With this app you will be able to take note of your progress,
by creating logs of your daily performance in whichever area you wish.*

*This app will start-off small and simple, allowing you to create new logs,
delete logs, view and update existing logs.*

**So please take into consideration that this is a work-in-progress!**

---

##To Do :

- [x] Design Layout
- [x] Implement RDD (Readme Driven Developement)
- [x] Begin coding with tests (This is always best practice)
- [ ] Define function do add person to database
- [ ] Define function to add workouts per user to database
- [ ] Define function to retrieve user's workouts by exercise and returns date, muscle group and sets
- [ ] Validation
- [ ] Authentication
- [x] Choose Database
- [ ] Implement Database
- [ ] Implement Hapi Views
- [ ] UI
- [ ] Test everything works
- [ ] Deploy App


---

##Why Hapi?

####For the following reasons:
* It is easy to implement (although there are not many working examples yet);
* It allows for a large amount of concurrent connections without forsaking performance levels(Walmart launched it on *Black Friday*) http://en.wikipedia.org/wiki/Black_Friday_(shopping)
* Has great documentation https://github.com/spumko/hapi
* Allows object schema validation with Joi https://github.com/spumko/joi
* Easy to test with Lab https://github.com/spumko/lab

It could have been easier to use [express](http://expressjs.com/), mainly because there are a lot more examples to follow, but what would be the fun in that right?

---

##Which Database?

Because Hapi is so recent, my major challenge was to select a database.

- [ ] Apache CouchDb - http://couchdb.apache.org/
- [ ] CouchBase - http://www.couchbase.com/wiki/display/couchbase/Home
- [ ] MongoDb - http://www.mongodb.org/

Performance wise, there is no major issue with any of these databases. This is not intended to be a big app with thousands of users.

---

###CouchDb

So bearing that in mind I started with *CouchDb*, but found I had trouble with connecting to the dabase while using tha HapiJs framework. Like I said there aren't that many examples to follow.
The documentation also seems to be presented in a not too friendly fashion. You might find it to be fine, but not for me.
I also found that I had trouble using or finding frameworks available to connect to CouchDb.

* See *ChouchDb* Vs *CouchBase* (http://www.couchbase.com/couchbase-vs-couchdb)

####I dumped *ChouchDb* and tried *CouchBase*.

---

###CouchBase

My first warning, is that after you install *CouchBase* from the website(http://www.couchbase.com/), you should always install the 'Developer Preview' as show in this tutorial (https://github.com/nelsonic/time):

```
npm install couchbase@2.0.0-dp1 --save
```
>When you proceed with the setup in the Admin Web Console, I would suggest that you avoid setting your username as **Admin**. I ran in to an issue before where I could not sign-in to my Web Console after loggin out and had set username to Admin. I had to completely remove CouchBase form my Mac and re-install it and then set my username to something other than **Admin** and it is now working fine! I do not know if it there was some sort of conflict with a probable default username **Admin** or **Administrator**.

The documentation for *CouchBase* is easy to follow and there are many examples.
If you need an example reference using *couchBase* with *Hapi*, go to https://github.com/nelsonic/time

I ended up dumping *CouchBase* from my dependencies for no specific reason in particular other than learning MongoDb could be a major advantage at this time, for Mongo is currently one of the most popular databases in use.
But I might re-implement it.

For additional information on setting-up *ChouchBase* on a Mac, go to https://github.com/couchbaselabs/docs-ng/blob/master/content/couchbase-manual-2.0/installing-and-upgrading.markdown#mac-os-x-installation

Also see: http://docs.couchbase.com/couchbase-devguide-2.5/#introduction-to-couchbase

For understanding views : http://docs.couchbase.com/couchbase-devguide-2.5/#finding-data-with-views

Another simple tutorial using Node.js and Couchbase: http://tugdualgrall.blogspot.co.uk/2013/03/easy-application-development-with.html

For the Node.js Api, list of methods: http://www.couchbase.com/autodocs/couchbase-node-client-1.0.0-beta/Connection.html

For a tutorial using CouchBase, Node and Angular - https://www.youtube.com/watch?v=Ynr8E5Rf1aA

---

###MongoDb

The documentation for *MongoDb* is very clear and well organised.
There are lots of examples to follow.

http://www.mongodb.org/

*I found it tricky to use mongoose directly with Hapi.*

*Once a connection opens, a callback will be called. For brevity, let's assume that all following code is within this callback.*

http://mongoosejs.com/docs/index.html
```
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
});
```
*I have not yet found a solution to this.*

I seem to have found an alternative with the *mongoose-simpledb* module.

See this video to "learn" how to connect to *MongoDb* while using **Hapi.js**(The framework used in the video is **express**, but the usage of the connection instance is the same):
* https://www.youtube.com/watch?v=CIPbmPUKyMI

The module used in this video (*mongoose-simpledb*) can be found at: https://www.npmjs.org/package/mongoose-simpledb


---

**In summery, so far my main problem has been finding a way to connect to
the databases with a module that is easy to use, well maintained and
tested and with examples using tha Hapi.js framework!**

---

Using CouchBase
---

I have run into the following error on one of my many iterations through deciding on which database to use.

```bash
Marios-MacBook-Air:LogIt mario$ npm test

> LogIt@0.0.0 test /Users/mario/LogIt
> ./node_modules/lab/bin/lab -c -v && ./node_modules/lab/bin/lab -r html -o ./test/coverage.html

{ queryhosts: null,
  _bucket: 'default',
  _cb: { _handleRestResponse: [Function] },
  connected: false }
Debug: hapi, internal, implementation, error
    ReferenceError: Uncaught error: err is not defined
    at /Users/mario/LogIt/index.js:81:108
    at Bucket._invokeStorage (/Users/mario/LogIt/node_modules/couchbase/lib/bucket.js:616:7)
    at Bucket.upsert (/Users/mario/LogIt/node_modules/couchbase/lib/bucket.js:992:8)
    at Bucket.set (/Users/mario/LogIt/node_modules/couchbase/lib/bucket.js:999:22)
    at logCont.addDoc.handler (/Users/mario/LogIt/index.js:80:54)
    at Object.internals.handler (/Users/mario/LogIt/node_modules/hapi/lib/handler.js:92:27)
    at /Users/mario/LogIt/node_modules/hapi/lib/handler.js:32:23
    at internals.Protect.run (/Users/mario/LogIt/node_modules/hapi/lib/protect.js:53:5)
    at exports.execute (/Users/mario/LogIt/node_modules/hapi/lib/handler.js:26:22)
    at /Users/mario/LogIt/node_modules/hapi/lib/request.js:323:13
    at iterate (/Users/mario/LogIt/node_modules/hapi/node_modules/async/lib/async.js:149:13)
    at /Users/mario/LogIt/node_modules/hapi/node_modules/async/lib/async.js:160:25
    at /Users/mario/LogIt/node_modules/hapi/node_modules/hoek/lib/index.js:539:22
    at process._tickDomainCallback (node.js:463:13)
LogIt Tests
  ✖1) Create User


 1 of 1 tests failed:

  1) LogIt Tests Create User:

      actual expected

      500    201

      expected 500 to equal 201

      at /Users/mario/LogIt/test/test.js:28:44


 No global variable leaks detected.

 Coverage: 89.66%

 index.js missing coverage on line(s): 6, 23, 24

npm ERR! Test failed.  See above for more details.
npm ERR! not ok code 0
```


**And now a look at my test code **

```javascript
var Lab = require('lab'); //require the lab module
var server = require('../'); //require index.js
//write individual tests for your functions with Lab.experiment
var couchbase = require('couchbase').Mock;
var db = new couchbase.Connection();


//name our test units
Lab.experiment("LogIt Tests", function(){
    //define the tests

    Lab.before(function(done){
      db.set("persons", {"FirstName": "Mario"}, function(result){
        return result;
      });
      setTimeout(function () { done(); } , 1000);
    });


    Lab.test("Create User", function(done){
      var options = {
        method: 'POST',
        url: '/userCreator'
      };
      //server.inject lets you simulate an http request
      //For our first test we do not have any documents in the databse.
      server.inject(options, function(response) {
        Lab.expect(response.statusCode).to.equal(201);//Expect http response status code to be 404(Not Found)
        //Lab.expect(response.result.value).to.equal(undefined);//there is no collection at the time
      done();
      });
    });



});
```

I have tryied to use the Lab.before() function because my test was timing out before after 2 secs.
But now instead I get a 500 Error. Bad request.

**The solution found is rather simpler. Remove ```Lab.before``` and the ```Timeout function``` and ```server.inject``` and then immediately set a document to the databse and get it back, as shown:**

```javascript
Lab.test("Set & Get a record", function(done) {
  db.set('personstest', {"FirstName":'Steve'}, function(err, result) {

    db.get('personstest', function(err, result) {

      Lab.expect(result.value.FirstName).to.equal('Steve');
      // console.log(result.value);
      done();
    });
  });
});
```

>I am going to attempt a change and use the express framework. - 16 Aug 2014
