/* 
 * File:   newmain.cpp
 * Author: andre
 *
 * Created on December 30, 2013, 8:23 PM
 */

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

void *connection_handler(void *);

using namespace std;

/*
 * 
 */
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
    //Get the socket descriptor
    int sock = *(int*) socket_desc;
    int read_size;
    char *message, client_message[8192];
    OggStream* stream = 0;
    StreamMap streams;
    FILE *file;
    FILE *fileopus;
    file = fopen("opus.raw", "wb+"); /* apend file (add text to a file or create a file if it does not exist.*/
    fileopus = fopen("opus.opus", "wb+"); /* apend file (add text to a file or create a file if it does not exist.*/

    //Receive a message from client

    // start opus 
    int error;
    OpusDecoder *dec;
    dec = opus_decoder_create(16000, 1, &error);
    if (error == OPUS_OK && dec != NULL) {
        // Creation of memory all ok.
        puts("OPUS LOADED");
    }

    // start pocketsphinx 

    while ((read_size = recv(sock, client_message, 8192, 0)) > 0) {

        char otherString[3];
        strncpy(otherString, client_message, 3);

        if (strcmp(otherString, "?G=") == 0) {
            puts("GRAM RECVD. StartPS");
        }

        if (strcmp(otherString, "END") == 0) {
            puts("END RECVD");
            // envia final hypothesis             
            // write(sock , client_message , strlen(client_message));
        }

        // decode ogg
        ogg_sync_state state;
        ogg_page page;
        int ret = ogg_sync_init(&state);
        char *buffer = ogg_sync_buffer(&state, 8192);
        memcpy(buffer, client_message, 8192);
        ret = ogg_sync_wrote(&state, 8192);
        

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
                puts("OGG OK");
                long length_pack = packet.bytes;
                unsigned char * data_pack = packet.packet;


                //from ogg_stream_packetout()
                // int total = fwrite(data_pack, sizeof(unsigned char) , length_pack , fileopus);      



                // decode opus 
                int frame_size = 1920;
                int lenaudio = frame_size * 1 * sizeof (opus_int16);
                //opus_int16 audio[lenaudio];
                short *in, *out;
                out = (short*) malloc(frame_size * 1 * sizeof (short));
                int res = opus_decode(dec, data_pack, length_pack, out, frame_size, 0);
                if (OPUS_INTERNAL_ERROR == res) {
                    puts("OPUS_INTERNAL_ERROR");
                } else if (OPUS_INVALID_PACKET == res) {
                    puts("OPUS_INVALID_PACKET");
                } else {
                    puts("OPUS OK");
                    puts("written to file");
                    fwrite(out, 2, res, file);

                }
            }
        }




        // send to pocketsphinx

        // envia partial hypothesis to node.js send to browser 
        // write(sock , client_message , strlen(client_message));

        //  puts("written to file"); fwrite(client_message, 1, 1000, file); 
        memset(client_message, 0, 8192);

    }
    if (read_size == 0) {
        puts("Client disconnected");
        fflush(stdout);
        fclose(fileopus); /*done!*/
        fclose(file); /*done!*/

    } else if (read_size == -1) {
        perror("recv failed");
    }

    puts("ending handler");
    return 0;
}


