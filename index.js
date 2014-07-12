var Hapi = require('hapi');
var path = require('path');
var Joi = require('joi');

var server = Hapi.createServer('localhost', 8080 || server.info.port, options);

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
    path: path.join(__dirname + '/templates'),
    engines: {
      html: require('handlebars')
    },
    helpersPath: path.join(__dirname, 'happyhelper')
  }
};

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
//This function will show all the logs created
logController.allLogs = {
  handler: function(req, reply) {
  reply(createdLogs);
  }
};
//This function will fetch specific logs according to the params id passed
//If the params.id passed is larger than the number of current Logs, it will return a message
logController.getLogs = {
  handler: function(req, reply) {
    if(req.params.id) {
      if(createdLogs.length <= req.params.id) return reply('No Log found!')
        return reply(createdLogs[req.params.id]);
    }
    reply(createdLogs);
  }
};
//This fucntion will create a newLog and then add it with the push method to
//createdLogs. We also validate with Joi that the input data is of the correct type
logController.addLogs = {
  handler: function(req, reply) {
  var newLog = {
    MuscleGroup: req.payload.MuscleGroup,
    'Date': req.payload.Date,
    Exercise: req.payload.Exercise
  };
  createdLogs.push(newLog);
  reply(newLog);
  },
  validate: {
    payload: {
      MuscleGroup: Joi.string().required(),
      'Date': Joi.string().required(),
      Exercise: Joi.string().required()
    }
  }
};
//This function will delete a specified log from createdLogs with the slice method
//If the selected log is not found, it will display a message informing that there is no log.
logController.deleteLog = {
  handler: function(req, reply) {
    if (createdLogs.length <= req.params.id) return reply('No Logs found!');
      createdLogs.splice(req.params.id, 1);
      reply(true);
  }
};

var routes = [
//set and store routes in array for code readability

//get path to styles folder
  /*{path: '/styles/{filename*}', method: 'GET', handler: {
    directory: {
      path: path.join(__dirname + '/styles')//join current directory root folder with path to styles folder to get styles
      }
    }
  },

//get path to images folder
  {path: '/public/{filename*}', method: 'GET', handler: {
    directory: {
      path: path.join(__dirname + '/public')
      }
    }
  },

//get path to scripts folder
  {path: '/scripts/{filename*}', method: 'GET', hanlder: {
    directory: {
      path: path.join(__dirname + '/scripts')
      }
    }
  }
*/
//set routes to html files

//set home.html as main page
  {path: '/', method: 'GET', handler: {file: 'home.html'}},
//go to cached logs page
  {path: '/yourlogs/', method: 'GET', config: logController.allLogs},
//set user home page
  {path: '/yourlogs/{id?}', method: 'GET', config: logController.getLogs},
//set path to add logs
  {path: '/newlog', method: 'POST', config: logController.addLogs},
//set the path to delete logs
  {path: '/yourlogs/deletelog/{id}', method: 'DELETE', config: logController.deleteLog}
];

server.route(routes);

server.start(function(){
  console.log('Go to localhost:8080/');
});
