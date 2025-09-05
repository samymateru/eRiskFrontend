import { z } from "zod";

export const qualitativeSchema = z.object({
  name: z.string().min(1, "KRI name is required"),
  frequency: z.string().min(1, "Frequency is required"),
  type: z.literal("Qualitative"),
  description: z.string().min(1, "Description is required"),
  very_high: z.string().optional(),
  high: z.string().optional(),
  medium: z.string().optional(),
  low: z.string().optional(),
});

export const quantitativeSchema = z.object({
  name: z.string().min(1, "KRI name is required"),
  frequency: z.string().min(1, "Frequency is required"),
  type: z.literal("Quantitative"),
  description: z.string().optional(),
  very_high: z.string().min(1, "Very High is required"),
  high: z.string().min(1, "High is required"),
  medium: z.string().min(1, "Medium is required"),
  low: z.string().min(1, "Low is required"),
});

export const NewKRISchema = z.discriminatedUnion("type", [
  qualitativeSchema,
  quantitativeSchema,
]);

export const ReadKRISchema = z.object({
  name: z.string(),
  type: z.string(),
  description: z.string(),
  frequency: z.string(),
  specific_date: z.date().optional(),
  very_high: z.string(),
  high: z.string(),
  medium: z.string(),
  low: z.string(),
  next_at: z.date(),
  created_at: z.date(),
});

export type NewKRIType = z.infer<typeof NewKRISchema>;
export type ReadKRIType = z.infer<typeof ReadKRISchema>;
