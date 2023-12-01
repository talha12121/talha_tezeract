import { z } from 'zod'

export const UserSchema = z.object({
    name: z.string().min(1, "Name is required").max(20, "User name can not be more than 20 letters"),
    email: z.string().min(1, "Email is required").email({ message: "Must be a valid email" }),
    phone: z.string().min(1, "Phone Number is required").max(20, "Phone Number can not be more than 11 numbers"),
    time: z.string().min(1, "Timing is required"),
})