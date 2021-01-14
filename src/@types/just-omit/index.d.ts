declare module 'just-omit' {
  // export default function omit(value: any): string
  function omit<T, U extends keyof T> (obj: T, select: U[]): Omit<T, U>
  function omit<T, U extends keyof T> (
    obj: T,
    select1: U,
    ...selectn: U[]
  ): Omit<T, U>
  export default omit
}
