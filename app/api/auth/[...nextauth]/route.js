import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import {connectDB} from '@/utils/db'
import User from '@/models/user';

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  callbacks:{

    async session({session}){

      const sessionUser = await User.findOne({email: session.user.email });

      return session;
    },

    async signIn({profile}){
      console.log(profile)

      try{
        await connectDB()

        const userExist = await User.findOne({email:profile.email})

        if(!userExist){
          const user = await User.create({
            email:profile.email,
            name:profile.name,
            image:profile.picture,
            provider:"google"
          })
        }

        return true

      }catch(err){

        console.log(err)

        return false
      }
    },
  }
})

export { handler as GET , handler as POST};