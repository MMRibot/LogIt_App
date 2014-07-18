var Hapi = require('hapi');
var path = require('path');
var Joi = require('joi');
var cradle = require('cradle'); //we require the cradle framework that works with couchdb
var db = new(cradle.Connection)().database('logs'); //set a connection to our database by passing the name of our databse as the only argument to
                                                    //database(). Cradle takes care of the rest for us!

var server = Hapi.createServer('localhost', 8080, options);

//set options for server
var options = {
  cache: {
    engines: require('catbox-redis'),
    options: {
      host: 'localhost',
      partition: 'LogIt',
      password: 'password'
    }
  },

  views:  {
    path: path.join(__dirname + './lib/templates'),
    engines: {
      html: require('handlebars')
    },
    helpersPath: path.join(__dirname, 'happyhelper')
  }
};

//Here we assign our function to getAllLogs for later use. This function will get our database and display it.


var cache = server.cache('createdLogs', { expiresIn:60*60*1000 });

var createdLogs = [
  {
    MuscleGroup: 'Arms',
    'Date': '12-08-2014',
    Exercise: 'Bicep curl'
  },
  {
    MuscleGroup: 'Legs',
    'Date': '11-08-214',
    Exercise: 'Leg Press'
    }
];
//create a place to store all our functions. This will make maintainability easier
var logController = { };

//This function will fetch specific logs according to the params id passed
logController.allLogs = function (req , reply) {
  var id = req.params.id; //assign params to the id variable. This will allow us to access our databse through the document id

      db.get( '_all_docs' , function (err , doc){
        //console.log(doc);
          return reply(doc);//This simple function will display all the docs in our databse.
      });
};

//This function gets the chosen log according to log id
logController.chooseLogs = {
  handler: function (req , reply) {
  var id = req.params.id;
  console.dir(req.params);


    db.head(id , function (err , opt1, opt2 ) {//We use the db.head function to determine of there are any docs available in our database
      if(err) {
        console.log( 'This error: ' + err);
        return err;//If an error occurs, we return the error
      }

      if(opt1 !== '404' && id!=='undefined') { //First we check to see if there is a doc by writing opt1 !== '404' and id!=='undefined'
        db.get(id , function (err, doc) {      //If these two condition are not met, we return an error 404, with the message 'document no found'
           if(err) {
             console.log ( 'Error: ' + err + " || " + 'No document found!'  );
             return reply( Hapi.error.notFound ('Document not found!'));
             } else {
               // console.log(doc);
                 return reply(doc); //If the conditions above are met, then we return the required document.
             }
         });
       }
   });
 },
};

//This fucntion will create a newLog and then add it with the push method to
//createdLogs. We also validate with Joi that the input data is of the correct type
logController.addLogs = {
  handler: function(req, reply) {
  var date = new Date().toString();
  var newLog = { //create a new log
    MuscleGroup: req.payload.MuscleGroup,
    'Date': date,
    Exercise: req.payload.Exercise,
    Set1_Reps: req.payload.Set1_Reps,
    Set2_Reps: req.payload.Set2_Reps,
    Set3_Reps: req.payload.Set3_Reps,
    Set1_Kg: req.payload.Set1_Kg,
    Set2_Kg: req.payload.Set2_Kg,
    Set3_Kg: req.payload.Set3_Kg
  };

  db.save(newLog, function(err, res) {
    if(err){
      return reply(Hapi.error.message('Was not able to add the log!'));
    } else {
      return res('Log successfully added to database!');
    }
  }); //add the newly created log to our list of already existing logs
 //display the newly created log
  }

  /*validate: {
//validate the input. It MUST HAVE ( required! ) three key/value pairs and each value must be a string.
    payload: {
      MuscleGroup: Joi.string().required(),
      Exercise: Joi.string().required(),
      Set1_Reps: Joi.number().required,
      Set2_Reps: Joi.number(),
      Set3_Reps: Joi.number(),
      Set1_Kg: Joi.number().required,
      Set2_Kg: Joi.number(),
      Set3_Kg: Joi.number()
    }
  }*/
};

//This function will delete a specified log from createdLogs with the slice method
//If the selected log is not found, it will display a message informing that there is no log.
logController.deleteLog = {
  handler: function(req, reply) {
    var id = Number(req.params.id);
    if ( id >= createdLogs.length || typeof id === 'undefined') { //we will display a 404 message if id is greater than our logs
                                                                  // length(can't delete what doesn't exist) OR if it is undefined
      console.log("------->>> delete req.params.id: " + req.params.id + " | id: " + id);
      return reply('No Logs found!').code(404);
    }
      createdLogs.splice(id, 1); //if the above condition is false, then we will delete the selected log from our list
      console.log('--------> New creadtedLogs: ' + createdLogs.toString());
      return reply(true);
    },
    validate: {
        params: { id:Joi.string().alphanum()} // make sure that our requested id is a string of the alphanumerical type with validation
    }
  };


var routes = [
//set and store routes in array for code readability

//get path to styles folder
  /*{path: '/styles/{filename*}', method: 'GET', handler: {
    directory: {
      path: path.join(__dirname + './lib/styles')//join current directory root folder with path to styles folder to get styles
      }
    }
  },

//get path to images folder
  {path: '/public/{filename*}', method: 'GET', handler: {
    directory: {
      path: path.join(__dirname + './lib/public')
      }
    }
  },

//get path to scripts folder
  {path: '/scripts/{filename*}', method: 'GET', hanlder: {
    directory: {
      path: path.join(__dirname + './lib/scripts')
      }
    }
  }
*/
//set routes to html files

//set home.html as main page
  {path: '/', method: 'GET', handler: {file: './lib/html/home.html'}},
//get all Logs
  {path: '/yourlogs/', method: 'GET', handler: logController.allLogs},
//choose logs from databse
  {path: '/yourlogs/{id}', method: 'GET', config: logController.chooseLogs},
//set path to add logs
  {path: '/yourlogs/newlog', method: 'POST', config: logController.addLogs},
//set the path to delete logs
  {path: '/yourlogs/deletelog/{id}', method: 'DELETE', config: logController.deleteLog}
];

server.route(routes);

if(!module.parent){
server.start(function(){
  console.log('Go to localhost:8080/');
});
}

server.createdLogs = createdLogs;//export creastedLogs to the test.js file in the test folder
module.exports = server;
