cmake_minimum_required(VERSION 3.30)

set(CMAKE_TEST_LAUNCHER "${CMAKE_COMMAND}" -E env BARE_MAKE_TEST=launcher --)

project(launcher NONE)
