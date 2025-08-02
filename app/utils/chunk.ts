// Utility functions
export const chunk = <T extends any>(arr: T[], size: number): T[][] => {
  const result = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}
