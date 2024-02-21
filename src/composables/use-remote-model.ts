
import { ref, watch, nextTick, type Ref } from "vue";

function useSyncRemote<T>(
  data: () => T,
  sync: (value: T) => Promise<void>,
  delay = 250
) {
  const _data = ref<T>();

  const _error = ref<string>();

  let initialized = false;

  let handle: NodeJS.Timeout;
  
  watch(_data, (data) => {
    if (!initialized) {
      return;
    }

    clearTimeout(handle);

    handle = setTimeout(async () => {
      if (handle) {
        try {
          _error.value = undefined;
          await sync(data as T);
        } catch (error) {
          _error.value = (error as any).message
        }
      }
    }, delay);
  });

  return {
    error: _error,
    data: _data as Ref<T>,
    init() {
      (_data.value as any) = data();
      nextTick(() => {
        initialized = true;
      });
    }
  };
}

export { useSyncRemote };
