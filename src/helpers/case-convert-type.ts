export type SnakeToCamelCaseField<S> =
  S extends `${infer T}_${infer U}` ?
  `${T}${Capitalize<SnakeToCamelCaseField<U>>}` :
    S

export type SnakeToCamelCase<T extends { [key: string]: any }> = {[K in keyof T as SnakeToCamelCaseField<K>]: T[K]}

export type CastToDate<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? Date | null : T[P]
}
export type Mutable<T> = {
  -readonly [K in keyof T]: T[K]
}
