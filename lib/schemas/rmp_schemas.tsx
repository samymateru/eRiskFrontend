import z from "zod";
import { UserDetailsSchema } from "./user";

export const NewRMPSchema = z.object({
  name: z.string().min(1, "Provide RMP Nam"),
  year: z.number().min(2025, "Provide a valid year").optional(),
});

export const ReadRMPSchema = z.object({
  rmp_id: z.string(),
  module_id: z.string(),
  name: z.string(),
  year: z.number(),
  status: z.string(),
  creator: UserDetailsSchema,
  approver: UserDetailsSchema,
  created_at: z.date(),
  approved_at: z.date(),
});

export type NewRMPType = z.infer<typeof NewRMPSchema>;
export type ReadRMPType = z.infer<typeof ReadRMPSchema>;
