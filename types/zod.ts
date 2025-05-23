import * as z from "zod";

export const SigninSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
});

export const UpdateSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(45, "Name must be less than 45 characters")
        .regex(new RegExp("^[a-zA-Z]+(?:\\s[a-zA-Z]+)*$"), "Only letters and single spaces allowed!"),
    email: z.string().email(),
});

export const ContactSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(45, "Name must be less than 45 characters")
        .regex(new RegExp("^[a-zA-Z]+(?:\\s[a-zA-Z]+)*$"), "Only letters and single spaces allowed!"),
    email: z.string().email("Please enter a valid email address"),
    topic: z
        .string()
        .min(10, "Topic must be at least 2 characters")
        .max(50, "Topic must be less than 45 characters"),
    message: z.string()
});
export type ContactTypes = z.infer<typeof ContactSchema>;

  

export const ReportSchema = z.object({
    mistaken: z.string(),
    correct: z.string()
});
export const UpdateReportSchema = z.object({
    status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
});