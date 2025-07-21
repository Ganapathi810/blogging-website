import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'


export default async function middleware(request : NextRequest) {
    console.log(`[Middleware] Running for path: ${request.nextUrl.pathname}`);

    // --- CRITICAL DEBUGGING LOGS (DO NOT REMOVE FOR DIAGNOSIS) ---
    // These logs will show what cookies are sent and what secret is seen by the middleware.
    console.log(`[Middleware Debug] Request Host: ${request.nextUrl.host}`);
    console.log(`[Middleware Debug] Request Protocol: ${request.nextUrl.protocol}`);
    console.log(`[Middleware Debug] Request Cookies Header: ${request.headers.get('cookie') || 'No Cookie Header'}`); // Added fallback
    console.log(`[Middleware Debug] NEXTAUTH_SECRET length: ${process.env.NEXTAUTH_SECRET?.length || 'Undefined'}`);
    console.log(`[Middleware Debug] NEXTAUTH_SECRET snippet: ${process.env.NEXTAUTH_SECRET ? process.env.NEXTAUTH_SECRET.substring(0, 10) + '...' : 'Undefined'}`);
    // --- END CRITICAL DEBUGGING LOGS ---


    const token = await getToken({
        req : request,
        secret : process.env.NEXTAUTH_SECRET // Use NEXTAUTH_SECRET consistently
    })

    console.log(token,' token content from getToken() ') // This will show if a token was successfully parsed

    // Keep this commented for now as you want to observe the token value
    // if(!token) {
    //     console.log(`[Middleware] No token found for ${request.nextUrl.pathname}.`);
    //     return NextResponse.redirect(new URL('/api/auth/signin',request.url))
    // }
    // console.log(`[Middleware] token found for ${request.nextUrl.pathname}. and proceeding ahead`);

    return NextResponse.next()
}

export const config = {
    // Matcher to protect all paths EXCEPT internal Next.js files, auth API routes, and the root path itself.
    matcher : ["/((?!_next|static|favicon.ico|api/auth|$).*)"]
}
