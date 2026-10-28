#include <stdlib.h>

#if defined(_WIN32)
__declspec(dllexport)
#endif
int
overflow(int i) {
  char *buffer = malloc(4);
  buffer[i] = 1;
  int result = buffer[0];
  free(buffer);
  return result;
}
