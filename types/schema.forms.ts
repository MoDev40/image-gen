import {z} from 'zod'

export const transformSchema = z.object({
    title: z.string(),
    aspectRatio: z.string().optional(),
    color: z.string().optional(),
    prompt: z.string().optional(),
    publicId: z.string(),
})

export type TransFormationInputs = z.infer<typeof transformSchema>