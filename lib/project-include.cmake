# The test launcher is not cached, so it is recorded here for `bare-make env`
# to run programs through outside of CTest.
if(PROJECT_IS_TOP_LEVEL)
  set(bare_make_test_launcher "${CMAKE_TEST_LAUNCHER}" CACHE INTERNAL "The launcher that tests run through")
endif()
