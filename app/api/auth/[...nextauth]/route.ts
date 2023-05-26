import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from '@utils/database';
import User from '@models/user';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
  ],
  callbacks: {
    session: async ({ session }) => {
      const sessionUser = await User.findOne({
        email: session?.user?.email,
      });

      if (session.user) {
        session.user.id = sessionUser._id.toString();
      }

      return session;
    },
    signIn: async ({ profile }) => {
      try {
        //serverless => lambda => dynamodb
        await connectToDB();

        //check if user already exists
        const userExists = await User.findOne({
          email: profile?.email,
        });

        //if not create user
        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(' ', '')?.toLowerCase(),
            image: profile?.image,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
