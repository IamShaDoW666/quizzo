import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required!",
  }),
});

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(1, {
      message: "Password is required!",
    }),
    confirmPassword: z.string().min(1, {
      message: "Confirm Password is required!",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export const quizCreateSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required!",
  }),
  description: z.string().min(1, {
    message: "Description is required!",
  }),
});

export const quizUpdateSchema = z.object({
  id: z.string(),
  title: z.string().min(1, {
    message: "Title is required!",
  }),
  description: z.string().min(1, {
    message: "Description is required!",
  }),
});

export const quizDeleteSchema = z.object({
  id: z.string().min(1, {
    message: "Title is required!",
  }),
});

export const questionCreateSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required!",
  }),
  marks: z.number().default(0),
  quizId: z.string(),
});
