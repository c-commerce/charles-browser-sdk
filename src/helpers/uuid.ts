// Use the platform CSPRNG instead of Math.random (TISAX 5.1.1)
export function v4 (): string {
  return crypto.randomUUID()
}
