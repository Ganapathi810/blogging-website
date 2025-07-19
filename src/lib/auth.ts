import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import  Google from 'next-auth/providers/google'
import prisma from './prisma'

export const { auth, handlers, signIn, signOut } = NextAuth({
    debug: true,
    providers : [
        GitHub({
            clientId : process.env.GITHUB_CLIENT_ID,
            clientSecret : process.env.GITHUB_CLIENT_SECRET
        }),
        Google({
            clientId : process.env.GOOGLE_CLIENT_ID,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET
        })

    ],
    secret : process.env.AUTH_SECRET,
    session : {
        strategy : 'jwt'
    },
    callbacks : {
        async signIn({ user }) {
            console.log(user)
            if(!user.email) {
                throw new Error("GitHub user has no email. Update GitHub scopes.")
                return false
            }

            try {
                await prisma.user.upsert({
                    where : { email : user.email },
                    update : {
                        name : user.name,
                        avatar : user.image || "https://www.svgrepo.com/show/452030/avatar-default.svg"
                    },
                    create : {
                        name : user.name,
                        email : user.email,
                        avatar : user.image || "https://www.svgrepo.com/show/452030/avatar-default.svg"
                    }
                })
                
                return true;
            } catch (error) {
                console.error('User creation failed: ',error)
                return false;
            }
        },
        async jwt({ token, user }) {
            if(user?.email) {
                const dbUser = await prisma.user.findUnique({
                    where : { email : user.email},
                    select : {
                        id : true
                    }
                })

                if(dbUser) token.id = dbUser.id.toString()
            }
            
            return token

        },
        async session({ session, token }) {
            if(session.user && token.id) {
                session.user.id = token.id as string
            }

            return session
        },
        async redirect() {
            return '/'
        }
    }
})