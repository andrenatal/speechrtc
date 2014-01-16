/* 
 * File:   newmain.cpp
 * Author: andre natal <anatal@gmail.com>
 *
 * Created on December 30, 2013, 8:23 PM
 */

#include <sys/time.h>
#include <cstdlib>
#include<stdio.h>
#include<string.h> //strlen
#include<stdlib.h> //strlen
#include<sys/socket.h>
#include<arpa/inet.h> //inet_addr
#include<unistd.h> //write
#include<pthread.h> //for threading , link with lpthread
#include <opus/opus.h>
#include <ogg/ogg.h>
#include <map>
#include "OggStream.cpp"
#include <pocketsphinx/pocketsphinx.h>
#include <sphinxbase/sphinx_config.h>

// FOR VAD AT SERVER
/* #include "webrtc/common_audio/vad/include/webrtc_vad.h" */

#define MODELDIR "/usr/local/src/psmodels"

void *connection_handler(void *);
void rec_and_send(ps_decoder_t *ps, int sock);
const char *  current_timestamp();
ps_decoder_t * ps_start();

using namespace std;

long maxsilence = 1500;
long minvoice = 250;

int main(int argc, char** argv) {
    int socket_desc, client_sock, c;
    struct sockaddr_in server, client;
    //Create socket
    socket_desc = socket(AF_INET, SOCK_STREAM, 0);
    if (socket_desc == -1) {
        printf("Could not create socket");
    }
    puts("Socket created");
    //Prepare the sockaddr_in structure
    server.sin_family = AF_INET;
    server.sin_addr.s_addr = INADDR_ANY;
    server.sin_port = htons(8888);
    //Bind
    if (bind(socket_desc, (struct sockaddr *) &server, sizeof (server)) < 0) {
        //print the error message
        perror("bind failed. Error");
        return 1;
    }
    puts("bind done");
    //Listen
    listen(socket_desc, 3);
    c = sizeof (struct sockaddr_in);
    //Accept and incoming connection
    puts("Waiting for incoming connections...");
    c = sizeof (struct sockaddr_in);
    pthread_t thread_id;
    while ((client_sock = accept(socket_desc, (struct sockaddr *) &client, (socklen_t*) & c))) {
        puts("Connection accepted");
        if (pthread_create(&thread_id, NULL, connection_handler, (void*) &client_sock) < 0) {
            perror("could not create thread");
            return 1;
        }
        //Now join the thread , so that we dont terminate before the thread
        //pthread_join( thread_id , NULL);
        puts("Handler assigned");
    }
    if (client_sock < 0) {
        perror("accept failed");
        return 1;
    }

    return 0;
}

void *connection_handler(void *socket_desc) {

    FILE *file;

    int sock = *(int*) socket_desc;
    int read_size;
    char *message, client_message[8192];
    OggStream* stream = 0;
    StreamMap streams;

    // start opus 
    int error;
    OpusDecoder *dec;
    dec = opus_decoder_create(16000, 1, &error);
    if (error != OPUS_OK && dec == NULL) {
        puts("ERROR LOADING OPUS");
    }

    // start pocketsphinx 
    ps_decoder_t *ps = ps_start();

    /* // IF RUN VAD AT SERVER
    VadInst* handle = NULL;
    if (WebRtcVad_Create(&handle) < 0) puts("Error creating WebRtcVad_Create");
    if (WebRtcVad_Init(handle) < 0) puts("Error initializing WebRtcVad_Init");
    if (WebRtcVad_set_mode(handle, 3) < 0) puts("Error setting mode WebRtcVad_set_mode");
     */

    while ((read_size = recv(sock, client_message, 8192, 0)) > 0) {

        char otherString[3];
        strncpy(otherString, client_message, 3);

        if (strcmp(otherString, "?G=") == 0) {
            puts("GRAM RECVD. StartPS");
            puts(otherString);
            continue;
        }

        if (strcmp(otherString, "STA") == 0) {

            int _res = ps_start_utt(ps, "goforward");

            file = fopen("opus.raw", "wb+");
            continue;
        }

        if (strcmp(otherString, "END") == 0) {
            puts("END RECVD");
            fclose(file);

            rec_and_send(ps, sock);
            continue;
        }

        // decode ogg
        ogg_sync_state state;
        ogg_page page;
        int ret = ogg_sync_init(&state);
        char *buffer = ogg_sync_buffer(&state, 8192);
        memcpy(buffer, client_message, 8192);
        ret = ogg_sync_wrote(&state, 8192);

        // here we accumulate the decoded pcm
        int totalpcm = 0;

        while (ogg_sync_pageout(&state, &page) == 1) {


            int serial = ogg_page_serialno(&page);


            if (ogg_page_bos(&page)) {
                stream = new OggStream(serial);
                ret = ogg_stream_init(&stream->mState, serial);
                streams[serial] = stream;
            } else {
                stream = streams[serial];
            }
            ret = ogg_stream_pagein(&stream->mState, &page);
            ogg_packet packet;
            while (ret = ogg_stream_packetout(&stream->mState, &packet)) {
                if (ret == 0) {
                    // Need more data to be able to complete the packet
                    puts("Need more data to be able to complete the packet");
                    continue;
                } else if (ret == -1) {
                    puts("// We are out of sync and there is a gap in the data. We lost a page somewhere.");
                    continue;
                }

                // A packet is available, this is what we pass  to opus
                stream->mPacketCount++;
                //puts("OGG OK");
                long length_pack = packet.bytes;
                unsigned char * data_pack = packet.packet;

                // decode opus 
                int frame_size = 1920;
                int lenaudio = frame_size * 1 * sizeof (opus_int16);
                //opus_int16 audio[lenaudio];
                short *in, *pcmsamples;
                pcmsamples = (short*) malloc(frame_size * 1 * sizeof (short));
                int totalpcm = opus_decode(dec, data_pack, length_pack, pcmsamples, frame_size, 0);

                // treat for more errors
                if (OPUS_INTERNAL_ERROR == totalpcm) puts("OPUS_INTERNAL_ERROR");
                else if (OPUS_INVALID_PACKET == totalpcm) {
                    puts("OPUS_INVALID_PACKET");
                } else {

                    puts("OPUS OK. Sending PS");
                    // uncomment to write to file
                    //puts("written to file");
                    fwrite(pcmsamples, 2, totalpcm, file);

                    ps_process_raw(ps, pcmsamples, totalpcm, TRUE, FALSE);

                    // envia partial hypothesis to node.js send to browser 
                    // write(sock , client_message , strlen(client_message));



                }
            }
        }


        //  puts("written to file"); fwrite(client_message, 1, 1000, file); 

        memset(client_message, 0, 8192);

    }
    if (read_size == 0) {

        // EVERYTHING CLEANED AT READ ERROR
        puts("Client disconnected");
        fflush(stdout);
        ps_free(ps);

    } else if (read_size == -1) {
        perror("recv failed");
    }

    puts("ending handler");
    ps_free(ps);
    return 0;
}



const char * current_timestamp() {
    struct timeval detail_time;
    gettimeofday(&detail_time, NULL);
    time_t ltime;
    struct tm *Tm; 
    ltime=time(NULL);
    Tm=localtime(&ltime);
    
    char * timestamp;
    sprintf(timestamp, "%d%d%d%d%d%d \n", Tm->tm_year, Tm->tm_hour, Tm->tm_min, Tm->tm_sec , detail_time.tv_usec / 1000, /* milliseconds */ detail_time.tv_usec); /* microseconds */
    return timestamp;
}



void rec_and_send(ps_decoder_t *ps, int sock) {
    char const *hyp, *uttid;
    int rv;

    if (ps_end_utt(ps) < 0) puts("Error ending utt");

    int32 score;
    hyp = ps_get_hyp(ps, &score, &uttid);
    if (hyp == NULL) {
        puts("Error hyp()");
        write(sock, "ERR", strlen("ERR"));
    } else {
        printf("Recognized: %s\n", hyp);
        // envia final hypothesis             
        write(sock, hyp, strlen(hyp));
    }


}

ps_decoder_t * ps_start() {
    cmd_ln_t *config = cmd_ln_init(NULL, ps_args(), TRUE,
            "-hmm", "/var/modelsps/hmm/hub4wsj_sc_8k/",
            "-jsgf", "/home/andre/projetos/workspace/PsContinuous/psApiContinuous/res/raw/gramjsgf.jsgf",
            "-dict", "/usr/local/share/pocketsphinx/model/lm/en_US/cmu07a.dic",
            NULL);
    if (config == NULL) puts("ERROR CREATING PSCONFIG");
    ps_decoder_t * ps = ps_init(config);
    if (ps == NULL) puts("ERROR CREATING PSCONFIG");
    return ps;
}
