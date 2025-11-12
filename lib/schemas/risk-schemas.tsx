import { z } from "zod";
import { UserDetailsSchema } from "./user";

export const ReadRiskSchema = z.object({
  risk_id: z.string().optional(),
  reference: z.string(),
  category: z.string(),
  process_name: z.string().optional(),
  sub_process: z.string().optional(),
  created_at: z.date().optional(),
  module_id: z.string().optional(),
  year: z.number().optional(),
  department: z.string().optional(),
  name: z.string(),
  status: z.string(),
  description: z.string(),
  creator: z.string().optional(),
  inherent_impact: z.number(),
  inherent_likelihood: z.number(),
  residual_impact: z.number(),
  residual_likelihood: z.number(),
  inherent_level: z.string(),
  residual_level: z.string(),
  owners: z.array(UserDetailsSchema).optional(),
});

export const NewRiskSchema = z.object({
  name: z.string().min(1, "Please provide risk name"),
  description: z.string().min(1, "Risk description required"),
  department: z.string().min(1, "Department required"),
  process: z.string().min(1, "Provide process"),
  sub_process: z.string().min(1, "Sub Process required"),
  category: z.string().min(1, "Category required"),
  impact: z.number(),
  likelihood: z.number(),
  inherent_level: z.number(),
});

export const NewRiskOwnersSchema = z.object({
    owners: z.array(z.string())
})

export const NewBusinessOwnerSchema = z.object({
    risk_ids: z.array(z.string())

})

export type NewRiskType = z.infer<typeof NewRiskSchema>;
export type NewRiskOwnersType = z.infer<typeof NewRiskOwnersSchema>;
export type NewBusinessOwnerType = z.infer<typeof NewBusinessOwnerSchema>;
export type ReadRiskType = z.infer<typeof ReadRiskSchema>;
