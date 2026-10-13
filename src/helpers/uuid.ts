const UUID_BYTES = 16
const HEX_RADIX = 16
const VERSION_BYTE_INDEX = 6
const VARIANT_BYTE_INDEX = 8

// Hex pairs 00..ff, so each byte is encoded with one lookup.
const BYTE_TO_HEX: string[] = []
for (let i = 0; i < 256; i++) {
  BYTE_TO_HEX.push((i + 0x100).toString(HEX_RADIX).slice(1))
}

// CSPRNG-backed UUID v4. randomUUID needs a secure context, getRandomValues does not.
export function v4 (): string {
  if (typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  const bytes = crypto.getRandomValues(new Uint8Array(UUID_BYTES))

  // RFC 4122: version nibble 4 in byte 6, variant bits 10xx in byte 8
  bytes[VERSION_BYTE_INDEX] = (bytes[VERSION_BYTE_INDEX] & 0x0f) | 0x40
  bytes[VARIANT_BYTE_INDEX] = (bytes[VARIANT_BYTE_INDEX] & 0x3f) | 0x80

  const hex: string[] = []
  for (let i = 0; i < bytes.length; i++) {
    hex.push(BYTE_TO_HEX[bytes[i]])
  }

  // 8-4-4-4-12
  return [
    hex.slice(0, 4).join(''),
    hex.slice(4, 6).join(''),
    hex.slice(6, 8).join(''),
    hex.slice(8, 10).join(''),
    hex.slice(10, 16).join('')
  ].join('-')
}
