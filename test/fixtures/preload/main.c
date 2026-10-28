#include <dlfcn.h>
#include <stdio.h>

int
main(int argc, char *argv[]) {
  if (argc < 2) return 1;

  void *module = dlopen(argv[1], RTLD_NOW);

  if (module == NULL) {
    printf("%s\n", dlerror());
    return 1;
  }

  int (*overflow)(int) = dlsym(module, "overflow");

  if (overflow == NULL) {
    printf("%s\n", dlerror());
    return 1;
  }

  return overflow(argc + 3);
}
