var express = require('express');
var q = require('q');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
var moment = require('moment');

app.post('/log/:service', function(req, res) {
  if (req.params.service == 'logentries') {
    console.log(req.body);
    var request = require('request');
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
    request.post(req.query.incomingURL,
      {
        form: {
          payload: JSON.stringify(data)
        }
      },
      function(error, response, body) {
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