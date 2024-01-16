
const DO_NOTHING = true;

function handleError(error: any) {
  if (DO_NOTHING) {
    return;
  }
  console.error(error);
}

export { handleError };
