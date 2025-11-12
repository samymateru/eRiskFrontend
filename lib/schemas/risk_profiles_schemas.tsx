import {z} from "zod";
import {ReadKRISchema} from "@/lib/schemas/kir-schemas";

export const NewRiskProfileSchema = z.object({
    remark: z.string().min(1, "Please enter a valid remark"),
    value: z.string().optional()
})

export const ReadRiskKRIProfileSchema = z.object({
    risk_id: z.string().optional(),
    reference: z.string(),
    category: z.string(),
    department: z.string().optional(),
    name: z.string(),
    description: z.string(),
    kri: z.array(ReadKRISchema)
})

export const ReadKRIReportSchema = z.object({
    kri_report_id: z.string().optional(),
    kri_name: z.string(),
    risk_category: z.string(),
    value: z.string().optional(),
    remark: z.string(),
    rating: z.string().optional(),
    created_at: z.date().optional(),
})


export type NewRiskProfileType = z.infer<typeof NewRiskProfileSchema>;
export type ReadRiskKRIProfileType = z.infer<typeof ReadRiskKRIProfileSchema>;
export type ReadKRIReportType = z.infer<typeof ReadKRIReportSchema>;