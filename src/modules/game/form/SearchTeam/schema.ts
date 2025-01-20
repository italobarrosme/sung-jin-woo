import { z } from 'zod'

export const searchTeamFormSchema = z.object({
  teamName: z
    .string()
    .min(3, 'O nome do time deve ter pelo menos 3 caracteres')
    .max(50, 'O nome do time deve ter no máximo 50 caracteres'),
})

export type SearchTeamFormData = z.infer<typeof searchTeamFormSchema>
