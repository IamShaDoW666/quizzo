"use server";
import { z } from "zod";
import { loginSchema, registerSchema } from "@/schema/formSchema";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "./lib/tokens";
import { getUserByEmail } from "./lib/data/user";
import { sendVerificationEmail } from "./lib/mail";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  console.log(process.env.requireEmailVerification);
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  if (process.env.REQUIRE_EMAIL_VERIFICATION == "true") {
    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(
        existingUser.email
      );
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      );
      return { success: "Verification Email Sent!" };
    }
  }

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

  const { email, password } = validatedFields.data;
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

  //Send email for verification
  if (process.env.REQUIRE_EMAIL_VERIFICATION == "true") {
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { message: "Verification Email Sent!" };
  }
  return { message: "User account created!" };
};
