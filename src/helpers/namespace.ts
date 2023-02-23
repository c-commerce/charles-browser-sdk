export function bindClassProperties<T, K extends keyof T> (parentClass: T, propName: K): void {
  const classProp = parentClass[propName]
  for (const key in classProp) {
    if (Object.prototype.hasOwnProperty.call(classProp, key) && typeof classProp[key] === 'function') {
      if (typeof classProp[key] === 'function') {
        classProp[key] = (classProp[key] as unknown as Function)?.bind?.(parentClass)
      }
    }
  }
}
