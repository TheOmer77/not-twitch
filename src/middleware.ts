import { NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

import { SIGN_IN_URL, SIGN_UP_URL } from '@/constants/clerk';

const publicRoutes = [
    '/',
    '/api/webhooks(.*)',
    '/api/uploadthing',
    '/:username',
    '/search',
  ],
  authRoutes = [SIGN_IN_URL, SIGN_UP_URL];
const isPublicRoute = createRouteMatcher(publicRoutes),
  isAuthRoute = createRouteMatcher(authRoutes);

export default clerkMiddleware(
  (auth, req) => {
    const { userId, protect } = auth();
    if (!isPublicRoute(req) && !isAuthRoute(req)) protect();
    if (isAuthRoute(req) && userId)
      return NextResponse.redirect(
        req.nextUrl.searchParams.get('redirect_url') ||
          process.env.NEXT_PUBLIC_APP_URL!
      );
  },
  { signInUrl: SIGN_IN_URL, signUpUrl: SIGN_UP_URL }
);

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
