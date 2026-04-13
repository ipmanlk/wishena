import { SignJWT, jwtVerify } from "jose";

const getSecret = () => {
  const secret = process.env.GUEST_SESSION_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("GUEST_SESSION_SECRET must be set in production");
    }
    return new TextEncoder().encode("fallback-secret-for-dev");
  }
  return new TextEncoder().encode(secret);
};

export async function signGuestSessionId(id: string): Promise<string> {
  return new SignJWT({ id })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(getSecret());
}

export async function verifyGuestCookie(token: string): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload.id as string;
  } catch (err) {
    return null;
  }
}
