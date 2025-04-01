export function eachWithIndex<T>(
  arr: T[],
  iter: (index: number, value: T) => void
): void {
  if (!Array.isArray(arr)) return;
  if (typeof iter !== 'function') return;

  for (let i = 0; i < arr.length; i++) {
    iter(i, arr[i]);
  }
}
