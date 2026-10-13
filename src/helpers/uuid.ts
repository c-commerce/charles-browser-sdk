const UUID_BYTES = 16
const VERSION_BYTE_INDEX = 6
const VARIANT_BYTE_INDEX = 8

// CSPRNG-backed UUID v4. randomUUID needs a secure context, getRandomValues does not.
export function v4 (): string {
  if (typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  const bytes = crypto.getRandomValues(new Uint8Array(UUID_BYTES))

  // RFC 4122: version nibble 4 in byte 6, variant bits 10xx in byte 8
  bytes[VERSION_BYTE_INDEX] = (bytes[VERSION_BYTE_INDEX] & 0x0f) | 0x40
  bytes[VARIANT_BYTE_INDEX] = (bytes[VARIANT_BYTE_INDEX] & 0x3f) | 0x80

  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')

  // 8-4-4-4-12
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}
