"use client"

import { useSession } from 'next-auth/react'

export function useUser() {
    const { data : session, status } = useSession()
    const user = session?.user

    return { user, status }
}


