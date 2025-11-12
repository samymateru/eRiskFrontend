import { z } from "zod";


export type UserType = {
    user_id?: string;
    name: string;
    email: string;
    image?: string;
};

export const CreatorSchema = z.object({
    usr_id: z.string(),
    usr_name: z.string(),
    usr_email: z.string(),
    usr_telephone: z.string(),
    usr_image: z.string(),
    usr_status: z.string(),
})

export const UserDetailsSchema = z.object({
  user_id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
  date: z.date(),
  type: z.string(),
  image: z.string().optional(),
  status: z.string().optional(),
  telephone: z.string().optional(),
  created_at: z.date()
});

export const NewUserSchema = z.object({
  name: z.string().min(1, "Name required"),
  email: z.email(),
  role: z.string().min(1, "Role Required"),
  type: z.string().min(1, "Type Required"),
});

export type ReadUserType = z.infer<typeof UserDetailsSchema>;
export type NewUserType = z.infer<typeof NewUserSchema>;
export type ReadCreator = z.infer<typeof CreatorSchema>
