import * as z from "zod";

export const UPDATE_USER_SCHEMA = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  avatar: z.string().url({ message: "Avatar must be a valid URL" }).optional(),
});

export const UPDATE_PREFERENCES_SCHEMA = z.object({
  theme: z.enum(["light", "dark"]).optional(),
  locale: z.enum(["en", "ar"]).optional(),
});
