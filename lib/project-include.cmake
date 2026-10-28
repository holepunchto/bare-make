if(NOT PROJECT_IS_TOP_LEVEL)
  return()
endif()

# The test launcher is not cached, so it is recorded here for `bare-make test
# env` to run programs through outside of CTest.
set(bare_make_test_launcher "${CMAKE_TEST_LAUNCHER}" CACHE INTERNAL "The launcher that tests run through")

# A module built with AddressSanitizer only reports inside a program that was
# not, such as an addon in a prebuilt runtime, once the runtime is preloaded.
# The compiler knows where its runtime is.
block()
  set(runtime)

  if(CMAKE_SYSTEM_NAME STREQUAL "Darwin")
    set(name libclang_rt.asan_osx_dynamic.dylib)
  elseif(CMAKE_SYSTEM_NAME STREQUAL "Linux")
    set(name libclang_rt.asan.so)
  endif()

  foreach(lang IN ITEMS C CXX)
    if(name AND CMAKE_${lang}_COMPILER_ID MATCHES "Clang" AND CMAKE_${lang}_FLAGS MATCHES "-fsanitize=([^ ]*,)?address([ ,]|$)")
      separate_arguments(flags NATIVE_COMMAND "${CMAKE_${lang}_FLAGS}")

      if(CMAKE_${lang}_COMPILER_TARGET)
        list(APPEND flags "--target=${CMAKE_${lang}_COMPILER_TARGET}")
      endif()

      execute_process(
        COMMAND "${CMAKE_${lang}_COMPILER}" ${flags} "-print-file-name=${name}"
        OUTPUT_VARIABLE runtime
        OUTPUT_STRIP_TRAILING_WHITESPACE
        ERROR_QUIET
      )

      # The driver answers with the name alone when it has no such file.
      if(NOT EXISTS "${runtime}")
        set(runtime)
      endif()

      break()
    endif()
  endforeach()

  set(bare_make_asan_runtime "${runtime}" CACHE INTERNAL "The AddressSanitizer runtime to preload")
endblock()
