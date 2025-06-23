export function chooseIf<T>(condition: boolean, first: T, second: T): T {
  return condition ? first : second;
}
