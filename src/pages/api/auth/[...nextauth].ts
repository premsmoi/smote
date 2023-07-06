import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { addNewUserProfile } from "../users";
import { USER_TYPE } from "../../../const";

export const authOptions: AuthOptions = {
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
    CredentialsProvider({
      name: 'Guest',
      credentials: {},
      async authorize() {
        return { id: 'guest'}
      }
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = { uid: token.sub }

      return session;
    },
    async signIn({ user, account }) {
      if (user.id === USER_TYPE.GUEST) return true;
  
      const userProfile: UserProfile = {
        uid: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        provider: account?.provider || '',
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
}

export default NextAuth(authOptions)