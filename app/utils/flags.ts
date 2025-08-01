import { createClient } from "@yz13/flags";



export const flags = createClient({ appId: "yz13" })


export const available = async () => flags.get("available-for-work")
