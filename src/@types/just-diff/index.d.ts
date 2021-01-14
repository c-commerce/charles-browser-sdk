declare module 'just-diff' {
  export function diff (source: object, target: object, fn?: any): object
  export const jsonPatchPathConverter: any
}
