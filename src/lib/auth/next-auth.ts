import { serverEnv } from "@/lib/env/server";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: serverEnv().GOOGLE_CLIENT_ID,
      clientSecret: serverEnv().GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      return user.email === serverEnv().ALLOWED_DASHBOARD_EMAIL;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
};
