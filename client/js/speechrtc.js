/**
 * Created by andre natal on 12/22/13.
 * anatal@gmail.com
 */

var utils;
var _stream;
var offline = true;
var nomike = true;

function SpeechRTC(lang,success,error)
{
    this.status = "offline";
    this.lang = lang;

    var client = new BinaryClient('ws://192.168.1.133:9000');
    client.on('error', function(error){
        if (SpeechRTC.onConnectionError) SpeechRTC.onConnectionError(error);
        return;
    });
    client.on('open', function(client){
        offline = false;
        if (SpeechRTC.onConnection) SpeechRTC.onConnection();
    });

    var mediaRecorder;

    if (!utils.validatebrowser()) {
        this.status = "Could not access the microphone.";
        nomike = true;
        if (error) error(this.status) ;
    } else {
        navigator.getUserMedia({audio: true},
            function(stream){
                // if everything ok
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
        };
        mediaRecorder.onerror = function(e){
            if (SpeechRTC.onListenError) SpeechRTC.onRecognitionError(e);
        };
    }

    this.stop = function()
    {
        setTimeout( function(){
            mediaRecorder.stop();
            wsstream = client.send("0", {name: "fim", size: 0});
            wsstream.on('data', function(data){
                if (SpeechRTC.onRecognition) SpeechRTC.onRecognition(data);
            });
        }, 500);
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
}
utils = new utils();
utils.include("js/binary.js");



