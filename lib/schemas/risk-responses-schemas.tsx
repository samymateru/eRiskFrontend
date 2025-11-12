import { z } from "zod";

export const NewRiskResponseSchema = z.object({
  control: z.string().min(1, "Please provide KRI name"),
  objective: z.string().min(1, "KRI type is important"),
  type: z.string().min(1, "Provide KRI frequency"),
  action_plan: z.string().min(1, "Provide KRI frequency"),
  frequency: z.string().min(1, "Provide KRI frequency"),
});

export const ReadRiskResponseSchema = z.object({
  risk_response_id: z.string(),
  risk_id: z.string(),
  name: z.string(),
  description: z.string(),
  control: z.string(),
  objective: z.string(),
  type: z.string(),
  action_plan: z.string(),
  frequency: z.string(),
  created_at: z.date(),
});

export type NewRiskResponseType = z.infer<typeof NewRiskResponseSchema>;
export type ReadRiskResponseType = z.infer<typeof ReadRiskResponseSchema>;
