import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const sessionCookie = cookies().get('admin-session')?.value || '';

    if (!sessionCookie) {
      return NextResponse.json({ isAdmin: false }, { status: 200 });
    }

    // Verify the session cookie
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);

    if (decodedClaims) {
      return NextResponse.json({ isAdmin: true, uid: decodedClaims.uid }, { status: 200 });
    }
    
    return NextResponse.json({ isAdmin: false }, { status: 200 });
  } catch (error) {
    // If the cookie is invalid or expired, just return false
    console.error('Session verification error:', error);
    return NextResponse.json({ isAdmin: false }, { status: 200 });
  }
}
