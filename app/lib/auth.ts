// lib/auth.ts

import { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    // Artık 'token' parametresi JWT tipinden gelecek ve 'roles'i tanıyacak
    async jwt({ token, account, profile }) {
      if (account && profile) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.roles = (profile as any)[`https://next-auth-app.com/roles`];
      }
      return token;
    },
    // Artık 'session' ve 'token' tipleri doğru gelecek, 'any'e gerek yok.
    async session({ session, token }) {
      if (session?.user) {
        session.user.roles = token.roles; // Hata vermeyecek!
      }
      return session;
    },
  },
};


