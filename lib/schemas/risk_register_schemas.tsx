import z from "zod";
import {CreatorSchema} from "./user";

export const NewRiskRegisterSchema = z.object({
  name: z.string().min(1, "Provide RMP Nam"),
  year: z.number().min(2025, "Provide a valid year").optional(),
});

export const ReadRiskRegisterSchema = z.object({
  rmp_id: z.string(),
  module_id: z.string(),
  name: z.string(),
  year: z.number(),
  status: z.string(),
  creator: CreatorSchema,
  approver: CreatorSchema,
  created_at: z.date(),
  approved_at: z.date(),
});

export type NewRiskRegisterType = z.infer<typeof NewRiskRegisterSchema>;
export type ReadRiskRegisterType = z.infer<typeof ReadRiskRegisterSchema>;
