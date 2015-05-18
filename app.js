
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');
var exphbs = require('express-handlebars');

var index = require('./routes/index');
var stream = require('./routes/stream');

var app = express();

app.set('views', __dirname + '/views');

app.engine('.hbs', exphbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index);

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var BinaryServer = require('binaryjs').BinaryServer;

var files = {};

// Start Binary.js server
var server = BinaryServer({port: 9001});
// Wait for new user connections
server.on('connection', function(client){
  client.on('error', function(e) {
    console.log(e.stack, e.message);
  });
  client.on('stream', function(stream, meta){
    if(meta.type == 'write') {
      files[meta.file] = stream;
    } else if (meta.type == 'read' && files[meta.file]) {
      files[meta.file].pipe(stream);
    }
 });
});

/*var _files = [];
glob(config.MEDIA_DIRECTORY + '/*.mp4',{},function(err, files) {
  for(var i = 0; i < files.length; i++) {
    _files.push({name:files[i]});
  }
});
*/


app.listen(8000);

console.log('server has started on port 8000');