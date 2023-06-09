import Entity, { DeletableEntity } from '../entities/_base'

export function isEntity (object: any): object is Entity<any, any> {
  return object instanceof Entity
}

export function isDeletable (object: any): object is DeletableEntity<any, any> {
  return isEntity(object) && 'deleted' in object
}

export function isEmbedded <T = any> (obj: T | string): obj is string {
  return !!obj && typeof obj !== 'string'
}

export function getEntityName (entityOrConstructor: any): string | null {
  if (!entityOrConstructor) return null
  if ('entityName' in entityOrConstructor) {
    return entityOrConstructor.entityName
  } else if ('entityName' in entityOrConstructor.prototype) {
    return entityOrConstructor.prototype.entityName
  }

  throw Error('value provided is not a class')
}
