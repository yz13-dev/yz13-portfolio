
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;

export const cdn = (path: string) =>
  `${SUPABASE_URL}/storage/v1/object/public${path}`;
