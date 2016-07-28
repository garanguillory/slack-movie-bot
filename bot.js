var express = require('express');
var app = express();
var url = require('url');
var request = require('request');

// var format = ".json";

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', (process.env.PORT || 9001));

app.get('/', function(req, res){
  res.send('Running like an 18 wheeler');
});

app.post('/post', function(req, res){
  var title = req.body.text;

  console.log('title: ', title);

  var parsed_url = url.format({
    pathname: 'http://www.omdbapi.com/?t=' + title
  });

  console.log(parsed_url);

  request(parsed_url, function (error, response, body) {
    if(error){
      console.log('error: ', error);
    }
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      var year = data.Year;
      var rated = data.Rated;
      var released = data.Released;
      var runtime = data.Runtime;
      var genre = data.Genre;
      var director = data.Director;
      var writer = data.Writer;


      var body = {
        response_type: "in_channel",
        "attachments": [
          {
            "text": "Director: " + director + "\n"
                  + "Rated: " + rated + "\n"
                  + "Runtime: " + runtime
          }
        ]
      };
      res.send(body);
    }
  });
});

app.listen(app.get('port'), function() {
  console.log('App is running on port', app.get('port'));
});