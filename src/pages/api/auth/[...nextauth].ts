import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { addNewUserProfile } from "../users";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_ID || '',
        clientSecret: process.env.GOOGLE_SECRET || '',
    }),
    FacebookProvider({
        clientId: process.env.FACEBOOK_ID || '',
        clientSecret: process.env.FACEBOOK_SECRET || '',
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, token }) {
      session.uid = token.sub;
      session.accessToken = token.accessToken;
      return session;
    },
    async signIn({ user, account }) {
      const userProfile: UserProfile = {
        uid: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        provider: account.provider,
      };

      await addNewUserProfile(userProfile);

      return true;
    },
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    }
  },
  secret: process.env.JWT_SECRET,
})