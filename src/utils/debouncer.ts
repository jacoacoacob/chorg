
function makeDebouncer(delay: number) {
  let handle: number;

  return (callback: () => any) => {
    clearTimeout(handle);
    setTimeout(callback, delay);
  }
}

export { makeDebouncer };
