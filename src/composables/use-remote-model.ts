
import { ref, watch, nextTick, type Ref } from "vue";

function useSyncRemote<T>(
  init: () => T,
  sync: (value: T) => Promise<void>,
  delay = 250
) {
  const data = ref<T>();

  let initialized = false;

  let handle: NodeJS.Timeout;
  
  watch(data, (data) => {
    if (!initialized) {
      return;
    }

    clearTimeout(handle);

    handle = setTimeout(async () => {
      if (handle) {
        console.log("sync")
        await sync(data as T);
      }
    }, delay);
  });

  return {
    data: data as Ref<T>,
    init() {
      (data.value as any) = init();
      nextTick(() => {
        initialized = true;
      });
    }
  };
}

export { useSyncRemote };
