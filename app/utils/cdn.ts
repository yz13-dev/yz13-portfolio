export const cdn = (path: string) =>
  `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public${path}`;
