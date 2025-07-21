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
    secret : process.env.NEXTAUTH_SECRET,
    session : {
        strategy : 'jwt'
    },
    callbacks : {
        async signIn({ user }) {
            console.log('Inside signIn')
            
            if(!user.email) {
                console.log('user.email does not exits')
                return false
            }
            
            try {
                console.log('inside try in signIn')
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
                console.log('inside catch in signIn')
                console.error('User creation failed: ',error)
                return false;
            }
        },
        async jwt({ token, user }) {
            console.log('inside jwt callback')
            if(user?.email) {
                try {
                    console.log('inside try in jwt and inside user.email exits')
                    const dbUser = await prisma.user.findUnique({
                        where : { email : user.email},
                        select : {
                            id : true
                        }
                    })

                    if(dbUser) token.id = dbUser.id.toString()

                } catch(error) {
                    console.log('Failed to sign in '+error)
                }
            }
            
            return token

        },
        async session({ session, token }) {
            console.log('inside session callback')
            if(session.user && token.id) {
                console.log('session.user and session.token.id exits')
                session.user.id = token.id as string
            }

            return session
        },
        async redirect() {
            console.log('inside redirec callback')
            return '/'
        }
    }
})
