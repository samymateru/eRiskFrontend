import { z } from "zod";

export const NewRiskRatingSchema = z.object({
  impact: z.number(),
  likelihood: z.number(),
  type: z.string().min(1, "Provide KRI frequency"),
});

export const UpdateResidualRiskRatingSchema = z.object({
  residual_impact: z.number(),
  residual_likelihood: z.number(),
});

export const ReadRiskRatingSchema = z.object({
  impact: z.number(),
  likelihood: z.number(),
  type: z.string(),
  created_at: z.date(),
});

export type NewKRiskRatingType = z.infer<typeof NewRiskRatingSchema>;
export type ReadKRiskRatingType = z.infer<typeof ReadRiskRatingSchema>;
export type UpdateResidualRiskRatingType = z.infer<
  typeof UpdateResidualRiskRatingSchema
>;
