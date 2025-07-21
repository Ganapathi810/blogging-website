
"use server"

import { signOut } from "@/lib/auth"

export const logout = async () => { 
    try {
        await signOut({ redirectTo : '/api/auth/signin'})
    } catch(error) {
        console.log("Failed to sign out : "+error)
        throw error;
    }
}

