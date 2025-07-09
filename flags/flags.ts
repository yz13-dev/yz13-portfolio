import { get } from "@vercel/edge-config";
import { flag } from "flags/next";




export const availableForWork = flag<boolean>({
  key: "available-for-work",
  async decide() {
    const result = await get<boolean>(this.key);
    return result ?? false;
  }
})


export const getInfoList = flag<string[]>({
  key: "info-list",
  async decide() {
    const result = await get<string[]>(this.key);
    return result ?? [];
  }
})
