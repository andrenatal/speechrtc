<?php

        $filename = $argv[1];

        $lang = $argv[2];

        $filename2 =  $filename . "_16.wav";

        $filenameflac = $filename . "_16.flac";

        // primeiro converte de opus para wav
        shell_exec('export LD_LIBRARY_PATH=/usr/local/lib/; opusdec ' . $filename . ' ' . $filename2 );

		// convert o primeiro arquivo para flac
		shell_exec('flac -f ' . $filename2  );

        //echo 'perl speechserver/speech.pl ' . $filenameflac . ' ' . $lang;

		// executo o script perl
		$output = shell_exec('perl speechserver/speech.pl ' . $filenameflac . ' ' . $lang);

		// leio o resultado do prompt e respondo pro cara
		echo $output;

/*
        $myFile = "logsrtc.txt";
        $fh = fopen($myFile, 'a') or die("can't open file");
        $stringData = date('Y-m-d H:i:s') . '|' . str_replace(PHP_EOL, '', $output) . '|' .  $_SERVER['HTTP_USER_AGENT'] . '|' .  $_GET['lang'] . '|' .  $_GET['c'] . "\n";
        fwrite($fh, $stringData);
        fclose($fh);
*/
?>



