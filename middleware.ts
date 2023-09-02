import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({});
 
/* import { withClerkMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default withClerkMiddleware(() => {
    console.log('mid run');
    return NextResponse.next();
}); */

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
 