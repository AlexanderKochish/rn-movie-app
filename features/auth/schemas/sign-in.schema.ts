import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim(),
})

export type signInSchemaType = z.infer<typeof signInSchema>
