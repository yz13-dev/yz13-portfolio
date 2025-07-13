import { createClient } from "@yz13/flags"
const client = createClient({ appId: "yz13" })

// Теперь можно использовать без явного указания defaultValue
export const availableForWork = async (): Promise<boolean> => {
  return await client.get<boolean>("available-for-work") ?? false // Автоматически вернет false
}

export const getInfoList = async (): Promise<string[]> => {
  return await client.get<string[]>("info-list") ?? [] // Автоматически вернет []
}

export const showSettings = async (): Promise<boolean> => {
  const isDev = import.meta.env.DEV;
  if (isDev) return true;
  return await client.get<boolean>("show-settings") ?? false // Автоматически вернет true
}
