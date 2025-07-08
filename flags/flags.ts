import { get } from "@vercel/edge-config";
import { flag } from "flags/next";




export const availableForWork = flag<boolean>({
  key: "available-for-work",
  async decide() {
    const result = await get<boolean>("available-for-work");
    return result ?? false;
  }
})
