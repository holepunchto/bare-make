cmake_minimum_required(VERSION 3.30)

project(preload C)

add_library(lib MODULE lib.c)

# The program that loads the module must not be sanitized itself, which is what
# leaves the preloaded runtime as the only one in play. Clearing the linker
# flags drops both the flag from `LDFLAGS` and the runtimes that the Apple
# toolchain names ahead of them, and the driver takes the compiler flags at
# link time as well, so the sanitizer is cancelled there too.
set(CMAKE_EXE_LINKER_FLAGS "")

add_executable(exe main.c)

target_compile_options(exe PRIVATE -fno-sanitize=address)

target_link_options(exe PRIVATE -fno-sanitize=address)

target_link_libraries(exe PRIVATE ${CMAKE_DL_LIBS})
