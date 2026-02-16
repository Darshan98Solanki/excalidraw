import zod from "zod";

export const signUpSchema = zod.object({
    email: zod.string().email({ message: "Invalid email address" }),
    name: zod.string().min(1, {message: "Name is required"}).max(100),
    password: zod.string().min(8, "Password must be at least 8 characters long").max(100),
})

export const singInSchema = zod.object({
    email: zod.string().email({ message: "Invalid email address" }),
    password: zod.string().min(8, "Password must be at least 8 characters long").max(100)
})

export const createRoomSchema = zod.object({
    name: zod.string().min(3, {message: "Room name is required"}).max(100),
})

export type SignUp = zod.infer<typeof signUpSchema>;
export type SignIn = zod.infer<typeof singInSchema>;
export type CreateRoom = zod.infer<typeof createRoomSchema>;