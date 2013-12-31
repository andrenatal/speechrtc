/* 
 * File:   OggStream.cpp
 * Author: andre
 * 
 * Created on December 30, 2013, 8:02 PM
 */


#include <map>
#include <ogg/ogg.h>

class OggStream {
public:
    int mSerial;
    ogg_stream_state mState;
    int mPacketCount;

    // Member functions definitions including constructor

    OggStream(int mSerial) {
        this->mSerial = mSerial;
    }

};




typedef std::map<int, OggStream*> StreamMap; 