
type FlagsSchema = {
  version: string,
  updated_at: string
  items: Record<string, any>
}


const client = async<T>({ baseUrl, path }: { baseUrl: string, path: string }): Promise<T> => {
  const url = new URL(path, baseUrl)

  const response = await fetch(url.toString())
  if (response.status !== 200) {
    throw new Error(`Failed to fetch flags`)
  }
  return response.json()
}

const bucketClient = client<FlagsSchema>({ baseUrl: "https://cdn.yz13.ru", path: "flags.json" })

const flag = async <T>(key: string, defaultValue: T): Promise<T> => {
  try {
    const flags = await bucketClient
    const value = flags.items[key]

    if (value === undefined || value === null) {
      if (defaultValue !== undefined) {
        return defaultValue
      }
      // Возвращаем автоматически определенное значение по умолчанию
      return defaultValue;
    }

    return value as T
  } catch (error) {
    if (defaultValue !== undefined) {
      return defaultValue
    }
    // Возвращаем автоматически определенное значение по умолчанию при ошибке
    return defaultValue
  }
}

// Теперь можно использовать без явного указания defaultValue
export const availableForWork = async (): Promise<boolean> => {
  return flag<boolean>("available-for-work", false) // Автоматически вернет false
}

export const getInfoList = async (): Promise<string[]> => {
  return flag<string[]>("info-list", []) // Автоматически вернет []
}
