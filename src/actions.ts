"use server";
import { z } from "zod";
import { loginSchema, registerSchema } from "@/schema/formSchema";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials!" };
        default:
          return { error: "Internal Server Error!" };
      }
    }
    throw error;
  }
};

export const registerAction = async (
  values: z.infer<typeof registerSchema>
) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, confirmPassword, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({ where: { email } });

  if (existingUser) {
    return { error: "Email already exists!" };
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  // TODO: Send email for verification

  return { message: "User account created!" };
};
