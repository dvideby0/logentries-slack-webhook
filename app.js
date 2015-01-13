var express = require('express');
var q = require('q');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var moment = require('moment');

app.post('/log/:service/:incomingURL', function(req, res) {
  if (req.params.service == 'logentries') {
    var request = require('request');
    console.log(req.params.incomingURL);
    var data = {
      text: req.body.alert.name,
      attachments: [{
        fallback: req.body.alert.name,
        pretext: req.body.alert.name,
        color: '#D00000',
        fields:[
          {
            title: req.body.host.name,
            value: req.body.event,
            short:false
          }
        ]
      }]
    };
    request.post(req.params.incomingURL,
      {
        form: {
          payload: JSON.stringify(data)
        }
      },
      function(error, response, body) {
        console.log(error, response, body);
        res.status(201).send();
      }
    );
  }
  else {
    res.status(400).send();
  }
});

/*
 ** Express listener
 */
var port = process.env.PORT || '9003';
app.listen(port);
console.log('REST API listening on ' + port + '...');