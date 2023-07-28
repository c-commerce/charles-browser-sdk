import { OpPatch } from '../@types/json-patch'

export function processPatches (operations: OpPatch[]): OpPatch[] {
  return operations.map(op => {
    if (op.op === 'replace' || op.op === 'add') {
      if (!('value' in op) || op.value === undefined) {
        (op).value = null
      }
    }

    return op
  })
}
