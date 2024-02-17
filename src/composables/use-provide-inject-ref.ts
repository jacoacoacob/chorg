import { ref, provide, type Ref, inject, isRef } from "vue";

function useProvideRef<T>(key: string, data?: T) {
  const _ref = ref(data);

  provide(key, _ref);

  return _ref;
}

function useInjectRef<T>(key: string) {
  return inject(key) as Ref<T>;
}

export { useInjectRef, useProvideRef };

