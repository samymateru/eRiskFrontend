import z from "zod"
import {CreatorSchema,} from "@/lib/schemas/user";

export const NewActivityReportSchema = z.object({
    description: z.string().min(1, "Description is required"),
    conclusion: z.string().min(1, "Conclusion is required"),
    // attachment: z
    //     .instanceof(File)
    //     .refine((file) => file.size > 0, {message: "Attachment file cannot be empty"}),
});

export const ReadActivityReportSchema = z.object({
    activity_report_id: z.string(),
    activity_id: z.string(),
    description: z.string(),
    conclusion: z.string(),
    attachment: z.string().optional(),
    creator: CreatorSchema,
    created_by: z.string(),
    created_at: z.date()
});

export type NewActivityReportType = z.infer<typeof NewActivityReportSchema>
export type ReadActivityReportType = z.infer<typeof ReadActivityReportSchema>