#
# Generated Makefile - do not edit!
#
# Edit the Makefile in the project folder instead (../Makefile). Each target
# has a -pre and a -post target defined where you can add customized code.
#
# This makefile implements configuration specific macros and targets.


# Environment
MKDIR=mkdir
CP=cp
GREP=grep
NM=nm
CCADMIN=CCadmin
RANLIB=ranlib
CC=gcc
CCC=g++
CXX=g++
FC=gfortran
AS=as

# Macros
CND_PLATFORM=GNU-Linux-x86
CND_DLIB_EXT=so
CND_CONF=Debug
CND_DISTDIR=dist
CND_BUILDDIR=build

# Include project Makefile
include Makefile

# Object Directory
OBJECTDIR=${CND_BUILDDIR}/${CND_CONF}/${CND_PLATFORM}

# Object Files
OBJECTFILES= \
	${OBJECTDIR}/_ext/996607396/audio_util.o \
	${OBJECTDIR}/_ext/371866273/complex_bit_reverse.o \
	${OBJECTDIR}/_ext/371866273/complex_fft.o \
	${OBJECTDIR}/_ext/371866273/copy_set_operations.o \
	${OBJECTDIR}/_ext/371866273/cross_correlation.o \
	${OBJECTDIR}/_ext/371866273/division_operations.o \
	${OBJECTDIR}/_ext/371866273/downsample_fast.o \
	${OBJECTDIR}/_ext/371866273/energy.o \
	${OBJECTDIR}/_ext/371866273/filter_ar.o \
	${OBJECTDIR}/_ext/371866273/get_hanning_window.o \
	${OBJECTDIR}/_ext/371866273/get_scaling_square.o \
	${OBJECTDIR}/_ext/371866273/min_max_operations.o \
	${OBJECTDIR}/_ext/371866273/real_fft.o \
	${OBJECTDIR}/_ext/371866273/refl_coef_to_lpc.o \
	${OBJECTDIR}/_ext/371866273/resample.o \
	${OBJECTDIR}/_ext/371866273/resample_48khz.o \
	${OBJECTDIR}/_ext/371866273/resample_by_2.o \
	${OBJECTDIR}/_ext/371866273/resample_by_2_internal.o \
	${OBJECTDIR}/_ext/371866273/resample_fractional.o \
	${OBJECTDIR}/_ext/371866273/spl_init.o \
	${OBJECTDIR}/_ext/371866273/spl_sqrt.o \
	${OBJECTDIR}/_ext/371866273/spl_version.o \
	${OBJECTDIR}/_ext/371866273/splitting_filter.o \
	${OBJECTDIR}/_ext/371866273/sqrt_of_one_minus_x_squared.o \
	${OBJECTDIR}/_ext/371866273/vector_scaling_operations.o \
	${OBJECTDIR}/_ext/2138748974/vad_core.o \
	${OBJECTDIR}/_ext/2138748974/vad_filterbank.o \
	${OBJECTDIR}/_ext/2138748974/vad_gmm.o \
	${OBJECTDIR}/_ext/2138748974/vad_sp.o \
	${OBJECTDIR}/_ext/2138748974/webrtc_vad.o \
	${OBJECTDIR}/_ext/931244554/OggStream.o \
	${OBJECTDIR}/_ext/931244554/newmain.o


# C Compiler Flags
CFLAGS=

# CC Compiler Flags
CCFLAGS=
CXXFLAGS=

# Fortran Compiler Flags
FFLAGS=

# Assembler Flags
ASFLAGS=

# Link Libraries and Options
LDLIBSOPTIONS=-L/usr/local/lib

# Build Targets
.build-conf: ${BUILD_SUBPROJECTS}
	"${MAKE}"  -f nbproject/Makefile-${CND_CONF}.mk ${CND_DISTDIR}/${CND_CONF}/${CND_PLATFORM}/voiceserver

${CND_DISTDIR}/${CND_CONF}/${CND_PLATFORM}/voiceserver: ${OBJECTFILES}
	${MKDIR} -p ${CND_DISTDIR}/${CND_CONF}/${CND_PLATFORM}
	${LINK.cc} -o ${CND_DISTDIR}/${CND_CONF}/${CND_PLATFORM}/voiceserver ${OBJECTFILES} ${LDLIBSOPTIONS} -lpthread -lopus -logg -lpocketsphinx -lsphinxbase

${OBJECTDIR}/_ext/996607396/audio_util.o: /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/audio_util.cc 
	${MKDIR} -p ${OBJECTDIR}/_ext/996607396
	${RM} "$@.d"
	$(COMPILE.cc) -g -I/usr/local/lib -I/usr/local/include -I/usr/local/include/pocketsphinx -I/usr/local/include/sphinxbase -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/996607396/audio_util.o /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/audio_util.cc

${OBJECTDIR}/_ext/371866273/complex_bit_reverse.o: /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/complex_bit_reverse.c 
	${MKDIR} -p ${OBJECTDIR}/_ext/371866273
	${RM} "$@.d"
	$(COMPILE.c) -g -DWEBRTC_POSIX -I/usr/local/lib -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/371866273/complex_bit_reverse.o /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/complex_bit_reverse.c

${OBJECTDIR}/_ext/371866273/complex_fft.o: /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/complex_fft.c 
	${MKDIR} -p ${OBJECTDIR}/_ext/371866273
	${RM} "$@.d"
	$(COMPILE.c) -g -DWEBRTC_POSIX -I/usr/local/lib -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/371866273/complex_fft.o /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/complex_fft.c

${OBJECTDIR}/_ext/371866273/copy_set_operations.o: /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/copy_set_operations.c 
	${MKDIR} -p ${OBJECTDIR}/_ext/371866273
	${RM} "$@.d"
	$(COMPILE.c) -g -DWEBRTC_POSIX -I/usr/local/lib -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/371866273/copy_set_operations.o /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/copy_set_operations.c

${OBJECTDIR}/_ext/371866273/cross_correlation.o: /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/cross_correlation.c 
	${MKDIR} -p ${OBJECTDIR}/_ext/371866273
	${RM} "$@.d"
	$(COMPILE.c) -g -DWEBRTC_POSIX -I/usr/local/lib -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/371866273/cross_correlation.o /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/cross_correlation.c

${OBJECTDIR}/_ext/371866273/division_operations.o: /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/division_operations.c 
	${MKDIR} -p ${OBJECTDIR}/_ext/371866273
	${RM} "$@.d"
	$(COMPILE.c) -g -DWEBRTC_POSIX -I/usr/local/lib -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/371866273/division_operations.o /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/division_operations.c

${OBJECTDIR}/_ext/371866273/downsample_fast.o: /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/downsample_fast.c 
	${MKDIR} -p ${OBJECTDIR}/_ext/371866273
	${RM} "$@.d"
	$(COMPILE.c) -g -DWEBRTC_POSIX -I/usr/local/lib -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/371866273/downsample_fast.o /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/downsample_fast.c

${OBJECTDIR}/_ext/371866273/energy.o: /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/energy.c 
	${MKDIR} -p ${OBJECTDIR}/_ext/371866273
	${RM} "$@.d"
	$(COMPILE.c) -g -DWEBRTC_POSIX -I/usr/local/lib -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/371866273/energy.o /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/energy.c

${OBJECTDIR}/_ext/371866273/filter_ar.o: /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/filter_ar.c 
	${MKDIR} -p ${OBJECTDIR}/_ext/371866273
	${RM} "$@.d"
	$(COMPILE.c) -g -DWEBRTC_POSIX -I/usr/local/lib -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/371866273/filter_ar.o /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/filter_ar.c

${OBJECTDIR}/_ext/371866273/get_hanning_window.o: /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/get_hanning_window.c 
	${MKDIR} -p ${OBJECTDIR}/_ext/371866273
	${RM} "$@.d"
	$(COMPILE.c) -g -DWEBRTC_POSIX -I/usr/local/lib -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/371866273/get_hanning_window.o /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/get_hanning_window.c

${OBJECTDIR}/_ext/371866273/get_scaling_square.o: /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/get_scaling_square.c 
	${MKDIR} -p ${OBJECTDIR}/_ext/371866273
	${RM} "$@.d"
	$(COMPILE.c) -g -DWEBRTC_POSIX -I/usr/local/lib -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/371866273/get_scaling_square.o /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/get_scaling_square.c

${OBJECTDIR}/_ext/371866273/min_max_operations.o: /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/min_max_operations.c 
	${MKDIR} -p ${OBJECTDIR}/_ext/371866273
	${RM} "$@.d"
	$(COMPILE.c) -g -DWEBRTC_POSIX -I/usr/local/lib -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/371866273/min_max_operations.o /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/min_max_operations.c

${OBJECTDIR}/_ext/371866273/real_fft.o: /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/real_fft.c 
	${MKDIR} -p ${OBJECTDIR}/_ext/371866273
	${RM} "$@.d"
	$(COMPILE.c) -g -DWEBRTC_POSIX -I/usr/local/lib -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/371866273/real_fft.o /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/real_fft.c

${OBJECTDIR}/_ext/371866273/refl_coef_to_lpc.o: /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/refl_coef_to_lpc.c 
	${MKDIR} -p ${OBJECTDIR}/_ext/371866273
	${RM} "$@.d"
	$(COMPILE.c) -g -DWEBRTC_POSIX -I/usr/local/lib -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/371866273/refl_coef_to_lpc.o /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/refl_coef_to_lpc.c

${OBJECTDIR}/_ext/371866273/resample.o: /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/resample.c 
	${MKDIR} -p ${OBJECTDIR}/_ext/371866273
	${RM} "$@.d"
	$(COMPILE.c) -g -DWEBRTC_POSIX -I/usr/local/lib -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/371866273/resample.o /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/resample.c

${OBJECTDIR}/_ext/371866273/resample_48khz.o: /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/resample_48khz.c 
	${MKDIR} -p ${OBJECTDIR}/_ext/371866273
	${RM} "$@.d"
	$(COMPILE.c) -g -DWEBRTC_POSIX -I/usr/local/lib -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/371866273/resample_48khz.o /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/resample_48khz.c

${OBJECTDIR}/_ext/371866273/resample_by_2.o: /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/resample_by_2.c 
	${MKDIR} -p ${OBJECTDIR}/_ext/371866273
	${RM} "$@.d"
	$(COMPILE.c) -g -DWEBRTC_POSIX -I/usr/local/lib -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/371866273/resample_by_2.o /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/resample_by_2.c

${OBJECTDIR}/_ext/371866273/resample_by_2_internal.o: /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/resample_by_2_internal.c 
	${MKDIR} -p ${OBJECTDIR}/_ext/371866273
	${RM} "$@.d"
	$(COMPILE.c) -g -DWEBRTC_POSIX -I/usr/local/lib -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/371866273/resample_by_2_internal.o /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/resample_by_2_internal.c

${OBJECTDIR}/_ext/371866273/resample_fractional.o: /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/resample_fractional.c 
	${MKDIR} -p ${OBJECTDIR}/_ext/371866273
	${RM} "$@.d"
	$(COMPILE.c) -g -DWEBRTC_POSIX -I/usr/local/lib -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/371866273/resample_fractional.o /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/resample_fractional.c

${OBJECTDIR}/_ext/371866273/spl_init.o: /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/spl_init.c 
	${MKDIR} -p ${OBJECTDIR}/_ext/371866273
	${RM} "$@.d"
	$(COMPILE.c) -g -DWEBRTC_POSIX -I/usr/local/lib -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/371866273/spl_init.o /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/spl_init.c

${OBJECTDIR}/_ext/371866273/spl_sqrt.o: /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/spl_sqrt.c 
	${MKDIR} -p ${OBJECTDIR}/_ext/371866273
	${RM} "$@.d"
	$(COMPILE.c) -g -DWEBRTC_POSIX -I/usr/local/lib -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/371866273/spl_sqrt.o /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/spl_sqrt.c

${OBJECTDIR}/_ext/371866273/spl_version.o: /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/spl_version.c 
	${MKDIR} -p ${OBJECTDIR}/_ext/371866273
	${RM} "$@.d"
	$(COMPILE.c) -g -DWEBRTC_POSIX -I/usr/local/lib -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/371866273/spl_version.o /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/spl_version.c

${OBJECTDIR}/_ext/371866273/splitting_filter.o: /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/splitting_filter.c 
	${MKDIR} -p ${OBJECTDIR}/_ext/371866273
	${RM} "$@.d"
	$(COMPILE.c) -g -DWEBRTC_POSIX -I/usr/local/lib -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/371866273/splitting_filter.o /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/splitting_filter.c

${OBJECTDIR}/_ext/371866273/sqrt_of_one_minus_x_squared.o: /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/sqrt_of_one_minus_x_squared.c 
	${MKDIR} -p ${OBJECTDIR}/_ext/371866273
	${RM} "$@.d"
	$(COMPILE.c) -g -DWEBRTC_POSIX -I/usr/local/lib -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/371866273/sqrt_of_one_minus_x_squared.o /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/sqrt_of_one_minus_x_squared.c

${OBJECTDIR}/_ext/371866273/vector_scaling_operations.o: /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/vector_scaling_operations.c 
	${MKDIR} -p ${OBJECTDIR}/_ext/371866273
	${RM} "$@.d"
	$(COMPILE.c) -g -DWEBRTC_POSIX -I/usr/local/lib -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/371866273/vector_scaling_operations.o /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/signal_processing/vector_scaling_operations.c

${OBJECTDIR}/_ext/2138748974/vad_core.o: /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/vad/vad_core.c 
	${MKDIR} -p ${OBJECTDIR}/_ext/2138748974
	${RM} "$@.d"
	$(COMPILE.c) -g -DWEBRTC_POSIX -I/usr/local/lib -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/2138748974/vad_core.o /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/vad/vad_core.c

${OBJECTDIR}/_ext/2138748974/vad_filterbank.o: /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/vad/vad_filterbank.c 
	${MKDIR} -p ${OBJECTDIR}/_ext/2138748974
	${RM} "$@.d"
	$(COMPILE.c) -g -DWEBRTC_POSIX -I/usr/local/lib -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/2138748974/vad_filterbank.o /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/vad/vad_filterbank.c

${OBJECTDIR}/_ext/2138748974/vad_gmm.o: /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/vad/vad_gmm.c 
	${MKDIR} -p ${OBJECTDIR}/_ext/2138748974
	${RM} "$@.d"
	$(COMPILE.c) -g -DWEBRTC_POSIX -I/usr/local/lib -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/2138748974/vad_gmm.o /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/vad/vad_gmm.c

${OBJECTDIR}/_ext/2138748974/vad_sp.o: /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/vad/vad_sp.c 
	${MKDIR} -p ${OBJECTDIR}/_ext/2138748974
	${RM} "$@.d"
	$(COMPILE.c) -g -DWEBRTC_POSIX -I/usr/local/lib -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/2138748974/vad_sp.o /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/vad/vad_sp.c

${OBJECTDIR}/_ext/2138748974/webrtc_vad.o: /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/vad/webrtc_vad.c 
	${MKDIR} -p ${OBJECTDIR}/_ext/2138748974
	${RM} "$@.d"
	$(COMPILE.c) -g -DWEBRTC_POSIX -I/usr/local/lib -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/2138748974/webrtc_vad.o /home/andre/NetBeansProjects/VadTester/webrtc/common_audio/vad/webrtc_vad.c

${OBJECTDIR}/_ext/931244554/OggStream.o: /var/www/speechrtc/voiceserver/OggStream.cpp 
	${MKDIR} -p ${OBJECTDIR}/_ext/931244554
	${RM} "$@.d"
	$(COMPILE.cc) -g -I/usr/local/lib -I/usr/local/include -I/usr/local/include/pocketsphinx -I/usr/local/include/sphinxbase -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/931244554/OggStream.o /var/www/speechrtc/voiceserver/OggStream.cpp

${OBJECTDIR}/_ext/931244554/newmain.o: /var/www/speechrtc/voiceserver/newmain.cpp 
	${MKDIR} -p ${OBJECTDIR}/_ext/931244554
	${RM} "$@.d"
	$(COMPILE.cc) -g -I/usr/local/lib -I/usr/local/include -I/usr/local/include/pocketsphinx -I/usr/local/include/sphinxbase -MMD -MP -MF "$@.d" -o ${OBJECTDIR}/_ext/931244554/newmain.o /var/www/speechrtc/voiceserver/newmain.cpp

# Subprojects
.build-subprojects:

# Clean Targets
.clean-conf: ${CLEAN_SUBPROJECTS}
	${RM} -r ${CND_BUILDDIR}/${CND_CONF}
	${RM} ${CND_DISTDIR}/${CND_CONF}/${CND_PLATFORM}/voiceserver

# Subprojects
.clean-subprojects:

# Enable dependency checking
.dep.inc: .depcheck-impl

include .dep.inc
