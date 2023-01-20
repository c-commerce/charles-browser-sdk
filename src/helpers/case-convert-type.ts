export type SnakeToCamelCaseField<S> =
  S extends `${infer T}_${infer U}` ?
  `${T}${Capitalize<SnakeToCamelCaseField<U>>}` :
    S

export type SnakeToCamelCase<T extends { [key: string]: any }> = {[K in keyof T as SnakeToCamelCaseField<K>]: T[K]}
