import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'

import User from "@models/user";

import { connectToDB } from "@utils/database"; 

const handler = NextAuth ({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 

        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
          })

    ],

    callbacks:  {

        async session ({session}) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })
    
            session.user.id = sessionUser._id.toString()
            
            return session;
        },
        
        async signIn ({profile}) {
            
            try {
                    await connectToDB();
    
                const userExists = await User.findOne({
                    email: profile.email
                });        
    
                if (!userExists) {
                      const username = profile.login
                ? profile.login.replace(/\s/g, "").toLowerCase()
                : profile.email.split('@')[0]; 
                        
                    
                    await User.create ({
                        
                        email: profile.email,
                        username: username,
                        image: profile.avatar_url 
                    })
    
                }
    
    
                    return true;
            } catch (error) {
                console.log(error)
                return false ;
            }
    
    
        }
    }

    
})


export { handler as GET, handler as POST };
