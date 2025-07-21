import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'


export default async function middleware(request : NextRequest) {
    console.log(`[Middleware] Running for path: ${request.nextUrl.pathname}`);

    const token = await getToken({
        req : request,
        secret : process.env.AUTH_SECRET
    })


    if(!token) {
        console.log(`[Middleware] No token found for ${request.nextUrl.pathname}.`);
        return NextResponse.redirect(new URL('/api/auth/signin',request.url))
    }
    console.log(`[Middleware] token found for ${request.nextUrl.pathname}. and proceeding ahead`);

    return NextResponse.next()
}

export const config = {
    matcher : ["/((?!_next|static|favicon.ico|api/auth|$).*)"]
}