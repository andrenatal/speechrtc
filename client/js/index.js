/**
 * Created by andre natal on 12/22/13.
 * anatal@gmail.com
 */
    var _speechrtc = null;
    function instancia()
    {
        _speechrtc = new SpeechRTC("en-US", function () {     console.log("success creating srtc"); } , function (error) {     console.log("error creating srtc: " + error); } );
    }

    function listen()
    {
        _speechrtc.listen();
    }

    function stop()
    {
        _speechrtc.stop();
    }

    function gram(grammar)
    {
        grammar = "#JSGF V1.0; grammar test; public <simple> =  move right  |  call mary | enter place | travel to new york;" ;
        _speechrtc.setGrammar(grammar)
    }

    SpeechRTC.onRecognition = function(said)
    {
        document.getElementById("resultados").innerHTML += "  " + said;
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