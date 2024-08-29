export const waitMs = (milliseconds: number): void => {
  const end = Date.now() + milliseconds;
  while (Date.now() < end) {
    // Busy wait
  }
};
