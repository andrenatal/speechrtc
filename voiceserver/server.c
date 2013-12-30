#include<stdio.h>
#include<string.h> //strlen
#include<stdlib.h> //strlen
#include<sys/socket.h>
#include<arpa/inet.h> //inet_addr
#include<unistd.h> //write
#include<pthread.h> //for threading , link with lpthread
#include <opus/opus.h>


void *connection_handler(void *);


int main(int argc, char *argv[]) {
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
    char *message, client_message[1000];

    FILE *file;
    file = fopen("opus.opus", "wb+"); /* apend file (add text to a file or create a file if it does not exist.*/

    //Receive a message from client
    
    // start opus 
    int          error;
    OpusDecoder *dec;    
    dec = opus_decoder_create(16000, 1, &error);
    if (error == OPUS_OK && dec != NULL ) {
      // Creation of memory all ok.
        puts("OPUS LOADED");
    }
    
    // start pocketsphinx 
    
    while ((read_size = recv(sock, client_message, 1000, 0)) > 0) {
        
        char otherString[3];
        strncpy(otherString, client_message, 3);
        
        if (strcmp(otherString, "?G=") == 0)
        {
            puts("GRAM RECVD. StartPS");
        }
                
        if (strcmp(otherString, "END") == 0)
        {
            puts("END RECVD");
            // envia final hypothesis             
            // write(sock , client_message , strlen(client_message));
        }
          
        // if not grammar neither end, then opus is coming.
        
        // decode ogg
        
        // decode opus 
        
        
        //from ogg_stream_packetout()
        int length_pack = 0; //op.packet
        int data_pack = 0; //op.bytes
        
        int frame_size = 1920;        
        int lenaudio = frame_size*1*sizeof(opus_int16) ;
        opus_int16 audio[lenaudio];
        
        int bandwidth = opus_packet_get_bandwidth(client_message);
        int res = 0 ;
        if (bandwidth == OPUS_INVALID_PACKET)
        {
             puts("bandwidth == OPUS_INVALID_PACKET"); 
        }
        else
        {
            res = opus_decode(dec, data_pack, length_pack , audio, frame_size, 0);              
            if (OPUS_INTERNAL_ERROR == res) { puts("OPUS_INTERNAL_ERROR"); } 
            else if (OPUS_INVALID_PACKET == res) { puts("OPUS_INVALID_PACKET"); }
            else { 
                puts("OPUS OK"); 
                fwrite(audio, 1, res, file); 
            }
        }
        
        

        // send to pocketsphinx
        
        // envia partial hypothesis to node.js
        // write(sock , client_message , strlen(client_message));
        
        // clean but filewrite before
      //  puts("written to file");
      //  fwrite(client_message, 1, 1000, file); 
        memset(client_message, 0, 1000);
   
    }
    if (read_size == 0) {
        puts("Client disconnected");
        fflush(stdout);

        fclose(file); /*done!*/

    } else if (read_size == -1) {
        perror("recv failed");
    }
    
    puts("ending handler");
    return 0;
} 


