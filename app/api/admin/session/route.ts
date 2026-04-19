import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json({ error: "No ID Token provided" }, { status: 401 });
    }

    // Verify token with Firebase Admin
    await adminAuth.verifyIdToken(idToken);

    // Create session cookie using adminAuth.createSessionCookie
    const expiresIn = 60 * 60 * 24 * 7 * 1000; // 7 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    const response = NextResponse.json({ success: true }, { status: 200 });
    
    // Set the cookie
    response.cookies.set("admin-session", sessionCookie, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    console.error("Session creation error:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true }, { status: 200 });
  response.cookies.delete("admin-session");
  return response;
}
