import Entity from '../entities/_base'

export function isEntity (object: any): Boolean {
  return object instanceof Entity
}
