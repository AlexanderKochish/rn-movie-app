import { z } from 'zod'

export const signUpSchema = z.object({
  username: z.string().trim(),
  email: z.string().trim().email(),
  password: z.string().trim(),
})

export type signUpSchemaType = z.infer<typeof signUpSchema>
