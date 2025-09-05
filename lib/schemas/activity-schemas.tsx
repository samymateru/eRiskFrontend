import { z } from "zod";
import {
    CreatorSchema,
    UserDetailsSchema
} from "./user";

export const NewActivitySchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Provide category"),
  type: z.string().min(1, "Type required"),
  frequency: z.string().min(1, "Provide frequency"),
  leads: z.array(z.string()).optional(),
});


export const ActivitySchema = z.object({
  activity_id: z.string().optional(),
  reference: z.string(),
  category: z.string(),
  title: z.string(),
  type: z.string(),
  status: z.string(),
  frequency: z.string(),
  implement_at: z.date(),
  creator: z.string(),
  user: CreatorSchema,
  leads: z.array(UserDetailsSchema),
  next_at: z.date(),
  created_at: z.date(),
});

export const NewActivityOwnersSchema = z.object({
    owners: z.array(z.string())
})




export type NewActivityType = z.infer<typeof NewActivitySchema>;
export type NewActivityOwnersType = z.infer<typeof NewActivityOwnersSchema>;
export type ReadActivityType = z.infer<typeof ActivitySchema>;

