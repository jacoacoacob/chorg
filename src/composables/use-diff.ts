import { computed, unref } from "vue";
import type { MaybeRef } from "vue";

function useDiff(
  a: MaybeRef<Record<string, any>>,
  b: MaybeRef<Record<string, any>>
) {
  return computed(() => {
    const _a = unref(a);
    const _b = unref(b);
    const aKeys = Object.keys(_a);
    const bKeys = Object.keys(_b);

    return aKeys.reduce((accum: { a: any, b: any }[], key) => {
      if (bKeys.includes(key) && _a[key] !== _b[key]) {
        accum.push({
          a: _a[key],
          b: _b[key]
        });
      }
      return accum;
    }, []);
  });
}

export { useDiff };
