/**
 * Created by andre natal on 12/22/13.
 * anatal@gmail.com
 */
    var _speechrtc = null;
    function instancia()
    {
        _speechrtc = new SpeechRTC("en-US", function () {     console.log("success creating"); } , function (error) {     console.log("error creating:" + error); } );
    }

    function listen()
    {
        _speechrtc.listen(["ORANGE","BLUE","RED","GREEN"]);
    }

    function stop()
    {
        _speechrtc.stop();
    }


    SpeechRTC.onRecognition = function(said)
    {
        console.log("onRecognition you said" + said);
    }

    SpeechRTC.onRecognitionError = function(error)
    {
        console.log("onRecognitionError:" + error);
    }


    SpeechRTC.onConnection = function()
    {
        console.log("onConnection!!!!!!!");
    }

    SpeechRTC.onConnectionError = function(error)
    {
        console.log("onConnectionError" + error);
    }