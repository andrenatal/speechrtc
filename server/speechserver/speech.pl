#!/usr/bin/perl

require LWP::UserAgent;

my $url = "https://www.google.com/speech-api/v1/recognize?xjerr=1&client=chromium&lang=" . $ARGV[1];
my $audio = "";

open(FILE, "<" . $ARGV[0]);
while(<FILE>)
{
    $audio .= $_;
}
close(FILE);

my $ua = LWP::UserAgent->new;

my $response = $ua->post($url, Content_Type => "audio/x-flac; rate=16000", Content => $audio);
if ($response->is_success)
{
    print $response->content;
}

1;