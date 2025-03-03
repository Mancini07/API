import z from "zod";

const envScherma = z.object({
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string(),
})

export const env = envScherma.parse(process.env)