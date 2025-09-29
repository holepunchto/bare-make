# Specify the target system
set(CMAKE_SYSTEM_NAME Generic)
set(CMAKE_SYSTEM_PROCESSOR cortex-m4)

# Specify the cross-compilation toolchain
set(TOOLCHAIN_PLATFORM espruino)
set(TOOLCHAIN_TARGET bangle2)
set(TOOLCHAIN_PATH "/opt/toolchains/arm-gnu-toolchain-13.2.Rel1-x86_64-arm-none-eabi")
set(TOOLCHAIN_PREFIX arm-none-eabi)
set(TOOLCHAIN_SYSROOT ${TOOLCHAIN_PATH}/${TOOLCHAIN_PREFIX})

# Set the C and C++ compilers
set(CMAKE_C_COMPILER ${TOOLCHAIN_PATH}/bin/${TOOLCHAIN_PREFIX}-gcc)
set(CMAKE_CXX_COMPILER ${TOOLCHAIN_PATH}/bin/${TOOLCHAIN_PREFIX}-g++)

# Set the assembler, linker, and other utilities
set(CMAKE_ASM_COMPILER ${CMAKE_C_COMPILER})
set(CMAKE_OBJCOPY ${TOOLCHAIN_PATH}/bin/${TOOLCHAIN_PREFIX}-objcopy)
set(CMAKE_OBJDUMP ${TOOLCHAIN_PATH}/bin/${TOOLCHAIN_PREFIX}-objdump)
set(CMAKE_SIZE ${TOOLCHAIN_PATH}/bin/${TOOLCHAIN_PREFIX}-size)

# Bangle2 Nordic SDK paths
set(NRF5_SDK_PATH "/opt/toolchains/nRF5-SDK-15") 
if(EXISTS "${NRF5_SDK_PATH}")
    include_directories(${NRF5_SDK_PATH}/components)
    include_directories(${NRF5_SDK_PATH}/components/softdevice/s140/headers)
    include_directories(${NRF5_SDK_PATH}/components/toolchain/cmsis/include)
else()
    message(WARNING "${NRF5_SDK_PATH} does not exist")
endif()

# Define flags for the compiler, linker, etc.
set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -mcpu=cortex-m4 -mthumb -mfloat-abi=hard -mfpu=fpv4-sp-d16") # review this
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} ${CMAKE_C_FLAGS}")

# Include build host paths
SET(CMAKE_FIND_ROOT_PATH_MODE_PROGRAM BOTH)
SET(CMAKE_FIND_ROOT_PATH_MODE_LIBRARY BOTH)
SET(CMAKE_FIND_ROOT_PATH_MODE_INCLUDE BOTH) 

# Bear Bangle2 related variables
set(BARE_ENGINE "github:espruino/Espruino#84ac439")
set(BARE_PREBUILDS OFF)
set(BARE_NO_DYNAMIC_LOADING ON)
set(BARE_NO_FILE_SYSTEM ON)
set(BARE_MINIMAL_MEMORY ON)
set(BARE_RTOS "FreeRTOS")

# Include_directories
include_directories(${TOOLCHAIN_SYSROOT}/include)

SET(CMAKE_CROSSCOMPILING 1)
# Disable compiler tests for bare-metal builds
set(CMAKE_C_COMPILER_WORKS 1)
set(CMAKE_CXX_COMPILER_WORKS 1)

# Add more defines here
add_definitions(-DBOARD_BANGLE2)
