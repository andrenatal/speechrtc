var fs = require('fs');
var http = require('http');
var AV = require('av');

// Serve client side statically
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);

// Start Binary.js server
var BinaryServer = require('binaryjs').BinaryServer;
var bs = BinaryServer({server: server});
var vm = require("vm");
var _opusdec = null;

eval( fs.readFileSync("ogg.js","utf8"));
eval( fs.readFileSync("opus.js","utf8"));
eval( fs.readFileSync("vorbis.js","utf8"));

// Wait for new user connections
bs.on('connection', function(client){
  var randomnumber;

  client.on('stream', function(stream, meta){

      if (meta.name == "start")
      {
          randomnumber=  +new Date();
          console.log('started: ' + randomnumber);
      }
      else if (meta.name == "fim")
      {
          var sys = require('sys')
          var exec = require('child_process').exec;
          var child;
          console.log('ended: ' + randomnumber);
          child = exec("php speechserver/convert.php speechserver/audios/" + randomnumber + " en-US", function (error, stdout, stderr) {
              sys.print('stdout: ' + stdout);
              stream.write(stdout);
              if (error !== null) {
                  console.log('exec error: ' + error);
              }
          });
      }
      else
      {

          stream.on('data' , function (buffer){
             // console.log('data...' + buffer);

              var avbuffer = new AV.Buffer(buffer);
              //console.log(avbuffer);
              var asset = new AV.Asset.fromBuffer(avbuffer);

              asset.on('buffer', function(perc) {
                  //list.push(new require('av').Buffer(buffer));
                  console.log('onbuffer:' + perc);
              });
              asset.on('data', function(bufferdecoded) {
                  //list.push(new require('av').Buffer(buffer));
                  console.log('data:' + bufferdecoded);
              });
              asset.on('format', function(fmt) {
                  //list.push(new require('av').Buffer(buffer));
                  console.log('format:' + fmt);
              });
              asset.on('decodeStart', function() {
                  //list.push(new require('av').Buffer(buffer));
                  console.log('decodeStart:' + bufferdecoded);
              });
              asset.on('error', function(err) {
                  //list.push(new require('av').Buffer(buffer));
                  console.log('err:' + err);
              });

              asset.demuxer = new AV.OggDemuxer(asset, avbuffer);
              asset.decoder = new OpusDecoder(asset.demuxer , 'opus');

              asset.decoder.decode();
                //asset.start();
             // console.log(asset.demuxer);
             // console.log(asset.decoder);
              //asset.start();

          });

      }



  });
});




server.listen(9000);
console.log('SpeechRTC server started on port 9000');
