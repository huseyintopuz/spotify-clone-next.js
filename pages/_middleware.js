import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

const req = NextRequest;

export async function middleware(req) {
    //  Token will exist if user is logged in.
    const secret = process.env.JWT_SECRET;

    const token = await getToken({ req, secret });

    const { pathname } = req.nextUrl;

    //  Allow the requests if the following is true...
    //  1) Its a request for next-auth-session & provider fetching
    //  2) the token exists

    if (pathname?.length && pathname.includes("/api/auth") || token) {
        return NextResponse.next();
    }

    //  Redirect them to login if they dont have token AND are requesting protected route
    
    if (!token && pathname !== '/login') {
        
        const url = req.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
        
    }
    
}


