import {z} from "zod";


export const NewRoleSchema = z.object({
    name: z.string().min(1, "Role name is required"),
    type: z.string().min(2, "Role type is required"),
})

export const ReadRoleSchema = z.object({
    name: z.string(),
    type: z.string(),
    created_at: z.date()
})

export type ReadRoleType = z.infer<typeof ReadRoleSchema>
