import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { COLLECTION, USER_TYPE } from "../../../const";
import { connectToDatabase } from "../../../utils/database";

export const addNewUserProfile = async (user: UserProfile): Promise<boolean> => {
  const { db } = await connectToDatabase();
  const checkedUser = await db.collection(COLLECTION.USERS).findOne({ uid: user.uid }) as any;

  if (checkedUser) {
    return false;
  }

  await db.collection(COLLECTION.USERS).insertOne({ ...user });

  return true;
}

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
      session.user = { uid: token.sub };
      session.googleToken = token.googleToken as string;
      session.facebookToken = token.facebookToken as string;

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
      if (account) {
        if (account.provider === 'google') {
          token.googleToken = account.id_token
        } else if (account.provider === 'facebook') {
          token.facebookToken = account.access_token
        }
      }
      return token
    }
  },
  secret: process.env.JWT_SECRET,
}

export default NextAuth(authOptions)