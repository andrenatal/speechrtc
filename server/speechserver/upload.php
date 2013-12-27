<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Max-Age: 1000');
if(array_key_exists('HTTP_ACCESS_CONTROL_REQUEST_HEADERS', $_SERVER)) {
    header('Access-Control-Allow-Headers: '
           . $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']);
} else {
    header('Access-Control-Allow-Headers: *');
}

if("OPTIONS" == $_SERVER['REQUEST_METHOD']) {
    exit(0);
}

		// pego o wav qeu baixou
		// pull the raw binary data from the POST array
		$data = substr($_POST['data'], strpos($_POST['data'], ",") + 1);
		// decode it
		$decodedData = base64_decode($data);
		// print out the raw data, 
		//echo ($decodedData);
		$name =  round(microtime(1) * 1000);
		$filename = "audios/$name.wav";
		// write the data out to the file
		$fp = fopen($filename, 'wb');
		fwrite($fp, $decodedData);
		fclose($fp);

		$filename2 =  "audios/" . $name . "_16.wav";  ;


		// agora faz downstream para 16khz
		shell_exec('sox -S ' . $filename . ' -r 16000 -b 16 ' . $filename2 );
		
			
		// convert o primeiro arquivo para flac
		shell_exec('flac ' . $filename2  );

		// executo o script perl
		$output = shell_exec('./speech.pl audios/' . $name . '_16.flac' . ' ' . $_GET['lang']);

		// leio o resultado do prompt e respondo pro cara							
		echo $output;


        $myFile = "logsrtc.txt";
        $fh = fopen($myFile, 'a') or die("can't open file");
        $stringData = date('Y-m-d H:i:s') . '|' . str_replace(PHP_EOL, '', $output) . '|' .  $_SERVER['HTTP_USER_AGENT'] . '|' .  $_GET['lang'] . '|' .  $_GET['c'] . "\n";
        fwrite($fh, $stringData);
        fclose($fh);
		
		
?>

