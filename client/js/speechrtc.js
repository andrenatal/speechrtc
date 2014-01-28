/**
 * Created by andre natal on 12/22/13.
 * anatal@gmail.com
 */

var utils;
var _stream;
var offline = true;
var nomike = true;
var speechEvents;
var voicemin = 250;
var silmax = 1500;
var lastpacket = false;
var mediaRecorder;

function SpeechRTC(lang,success,error)
{
    this.status = "offline";
    this.lang = lang;

    var client = new BinaryClient('ws://'+window.content.location.host+':9000');
    client.on('error', function(error){
        if (SpeechRTC.onConnectionError) SpeechRTC.onConnectionError(error);
        return;
    });
    client.on('open', function(client){
        offline = false;
        if (SpeechRTC.onConnection) SpeechRTC.onConnection();
    });
    client.on('stream', function(stream, meta){

        // Got new data
        stream.on('data', function(data){
            if (meta.name == "res")
            {
                var  binaryString = '', bytes = new Uint8Array(data), length = bytes.length;
                for (var i = 0; i < length; i++) {
                    binaryString += String.fromCharCode(bytes[i]);
                }
                SpeechRTC.onRecognition(binaryString);
            }
        });
    });



    if (!utils.validatebrowser()) {
        this.status = "Could not access the microphone.";
        nomike = true;
        if (error) error(this.status) ;
    } else {
        navigator.getUserMedia({audio: true},
            function(stream){
                // if everything ok
                var options = {};
                speechEvents = hark(stream, options);
                declarespeechevents();

                _stream = stream;
                if (success) success() ;
                nomike = false;
            } ,
            function(_error){
                if (error) error(_error)
                nomike = true;
            } );

    }

    this.listen = function (words)
    {
        if (offline || nomike)
        {
            if (SpeechRTC.onRecognitionError) SpeechRTC.onRecognitionError("Not connected");
            return;
        }
        wsstream = client.send("0", {name: "start", size: 0});
        mediaRecorder = new MediaRecorder(_stream);
        mediaRecorder.start(1000);
        mediaRecorder.ondataavailable = function(e) {

                wsstream = client.send(e.data, {name: "audio", size: e.data.size});
               console.log('bytes de audio enviado pro node');
        };
        mediaRecorder.onerror = function(e){
            if (SpeechRTC.onListenError) SpeechRTC.onRecognitionError(e);
        };

        mediaRecorder.onstop = function()
        {
            console.log('mediarecorder stopped');
            stop();
        };

        startvadTimeout();
    }

    this.stop = function()
    {
            console.log('stoping mediaRecorder');

            wsstream = client.send("0", {name: "fim", size: 0});
            console.log('sending end command');
            wsstream.on('data', function(data){
                if (SpeechRTC.onRecognition) SpeechRTC.onRecognition(data);
            });

    }

    this.setGrammar = function(grammar)
    {
        console.log("grammar.length:" + grammar.length);
        console.log(grammar);
        client.send(grammar, {name: "grm", size: grammar.length});
    }

}

function utils()
{
    this.include = function(url)
    {
        var s = document.createElement("script");
        s.setAttribute("type", "text/javascript");
        s.setAttribute("src", url);
        document.head.appendChild(s);
    }

    this.validatebrowser = function()
    {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        return  (typeof MediaRecorder === 'undefined' || !navigator.getUserMedia)  ?  false :  true;
    }

    this.generatejsgf = function()
    {

    }
}


function startvadTimeout()
{
    novadatall = false;

    // termina por tempo
    setTimeout(function(){
        if (novadatall) return;
        console.log('termina vad por tempo.set lastpacket' );
        touchvoice = false;
        counting = false;
        lastpacket = true;
        novadatall = true;
        mediaRecorder.stop();
    },5000);
}

var novadatall = true;
function declarespeechevents()
{
    var touchvoice ,  counting = false;

    speechEvents.on('speaking', function() {
        if (novadatall) return;

        if (!counting)
        {
            setTimeout(function(){
                touchvoice = true;
                console.log('touchvoice' + Date.now());
            },250);
            counting = true;
        }
    });

    speechEvents.on('stopped_speaking', function() {
        if (novadatall) return;
        if (counting)
        {
            if (touchvoice)
                setTimeout(function(){
                    touchvoice = false;
                    counting = false;
                    console.log('stopped_speaking touchsilence. set lastpacket');
                    lastpacket = true;
                    novadatall = true;
                    mediaRecorder.stop();
                },1500);
        }
    });
}

utils = new utils();
utils.include("js/binary.js");
utils.include("js/hark.bundle.js");



