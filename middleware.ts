import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/security';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

// Protect all /money-smile/art/home routes
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/money-smile/art/home')) {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.redirect(new URL('/money-smile/art/auth/login', req.url));
    }
    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);
    if (!payload || typeof payload !== 'object' || !('id' in payload)) {
      return NextResponse.redirect(new URL('/money-smile/art/auth/login', req.url));
    }
    await dbConnect();
    const user = await User.findById(payload.id).select('role');
    if (!user || user.role !== 'admin') {
      return NextResponse.redirect(new URL('/money-smile/art/auth/login', req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/money-smile/art/home/:path*'],
};
