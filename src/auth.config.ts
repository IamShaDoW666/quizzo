import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./schema/formSchema";
import { getUserByEmail } from "./lib/data/user";
import bcrypt from "bcryptjs";
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passMatched = await bcrypt.compare(password, user.password);

          if (passMatched) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
