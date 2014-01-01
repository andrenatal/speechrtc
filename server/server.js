var fs = require('fs');
var http = require('http');
var AV = require('av');

// Serve client side statically
var express = require('express');
var app = express();
var net = require('net'), events = require('events'), util = require('util');

app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);

// Start Binary.js server
var BinaryServer = require('binaryjs').BinaryServer;
var bs = BinaryServer({server: server});


// Wait for new user connections
bs.on('connection', function(client){
  var randomnumber;
    var server = new Connection({ port: 8888, host: "localhost"});
    console.log('stream');
  client.on('stream', function(stream, meta){

      if (meta.name == "start")
      {
          randomnumber=  +new Date();
          console.log('started: ' + randomnumber);
          server.socket.write("START", function() {
              console.log('start sent');
          });
      }
      else if (meta.name == "fim")
      {
          var sys = require('sys')
          var exec = require('child_process').exec;
          var child;
          console.log('ended: ' + randomnumber);

          server.socket.write("END", function() {
              console.log('end sent');
          });

          /*
          child = exec("php speechserver/convert.php speechserver/audios/" + randomnumber + " en-US", function (error, stdout, stderr) {
              sys.print('stdout: ' + stdout);
              // manda pro usuario
              stream.write(stdout);
              if (error !== null) {
                  console.log('exec error: ' + error);
              }
          }); */
      }
      else
      {
          stream.on('data' , function (buffer){
              server.socket.write(buffer, function() {
                  console.log('data rcvd & sent');
              });
          });
      }
  });
});


function Connection(settings) {
    events.EventEmitter.call(this);
    var self = this;

    this.socket = net.createConnection(settings.port, settings.host);
    this.socket.setNoDelay(true);
    this.status = 'connecting';

    this.socket.on('connect', function() {
        console.log('connected');
        console.log('writing');

    });

    this.socket.on('data', function(chunk) {
        console.log('got data: ' + chunk);

    });


    this.socket.on('error', function() {
        console.log('error socket' );

    });
}

server.listen(9000);
console.log('SpeechRTC server started on port 9000');
