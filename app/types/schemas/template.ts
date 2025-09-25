import z from "zod";

export const templateSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  path: z.string(),
  description: z.string(),
  author: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  thumbnail: z.string(),
  attachments: z.array(z.string()),
  status: z.string(),
})

export type Template = z.infer<typeof templateSchema>;
