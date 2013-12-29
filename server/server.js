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
              console.log('data rcvd');
              var avbuffer = new AV.Buffer(buffer);
              var asset = new AV.Asset.fromBuffer(avbuffer);

              asset.on('buffer', function(perc) {
                  //console.log('onbuffer:' + perc);
              });
              asset.on('data', function(bufferdecoded) {
                //  console.log('data aqui!!' + bufferdecoded.length);

                  var buff = new Buffer( new Uint8Array(bufferdecoded));

                  fs.appendFile('audio.raw', buff, function (err) {
                      if (err) throw err;
                      console.log('The "data to append" was appended to file!');
                  });

              });
              asset.on('decodeStart', function() {
                  console.log('decodeStart!!!!!!!!!!!!!!!' );
              });
              asset.on('error', function(err) {
                  console.log('err:' + err);
              });

              asset.demuxer = new AV.OggDemuxer(asset, avbuffer);
              asset.decoder = new OpusDecoder(asset.demuxer , 'opus');

               // METODO DE EXTRACT1
//             asset.decoder.decode();

              // METODO DE EXTRACT2

              /*
              asset.decodeToBuffer(function(buffer) {
                  console.log('buffer is now a Float32Array containing the entire decoded audio file');
              });
*/

              // METODO DE EXTRACT3
              asset.start();


          });

      }



  });
});




server.listen(9000);
console.log('SpeechRTC server started on port 9000');
