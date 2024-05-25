// Returns a random integer from within a range
export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);
