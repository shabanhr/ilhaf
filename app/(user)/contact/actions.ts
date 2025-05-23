"use server";

import * as z from "zod";
import { sendContactEmail } from "@/lib/mail";
import { ContactSchema, ContactTypes } from "@/types/zod";

export const SendContactEmails = async (values: ContactTypes) => {
    const validatedFields = ContactSchema.safeParse(values);
    if (!validatedFields.success) {
        return { success: false, message: "Invalid fields!", };
    }
    const res = await sendContactEmail(validatedFields.data);

    if (res.success) {
        return { success: true, message: "Message sent successfully!" }
    } else {
        return { success: false, message: "Somthing went Wrong!" }
    }
}