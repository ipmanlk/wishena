"use server";

import { nanoid } from "nanoid";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { guestWishRepository } from "../guest/guest-wish-repository";
import { signGuestSessionId, verifyGuestCookie } from "../guest/session";
import { supabaseWishRepository } from "../storage/supabase-wish-repository";
import { createClient } from "../supabase/server";
import type { Wish } from "../types";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  // Claim guest wishes
  const cookieStore = await cookies();
  const guestToken = cookieStore.get("wishena-guest")?.value;
  if (guestToken) {
    const sessionId = await verifyGuestCookie(guestToken);
    if (sessionId) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await guestWishRepository.claimWishes(sessionId, user.id);
        cookieStore.delete({ name: "wishena-guest", path: "/" });
      }
    }
  }

  redirect("/my-wishes");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return { error: error.message };
  }

  // Claim guest wishes
  const cookieStore = await cookies();
  const guestToken = cookieStore.get("wishena-guest")?.value;
  if (guestToken) {
    const sessionId = await verifyGuestCookie(guestToken);
    if (sessionId) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await guestWishRepository.claimWishes(sessionId, user.id);
        cookieStore.delete({ name: "wishena-guest", path: "/" });
      }
    }
  }

  redirect("/my-wishes");
}

export async function signInWithGoogle() {
  const supabase = await createClient();
  const headersList = await headers();
  const origin =
    headersList.get("origin") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.url) {
    redirect(data.url);
  }
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return { error: error.message };
  }
  redirect("/");
}

export async function resendVerificationEmail() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || user.email_confirmed_at || !user.email)
    return { error: "Not eligible" };

  const headersList = await headers();
  const origin =
    headersList.get("origin") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  const { error } = await supabase.auth.resend({
    type: "signup",
    email: user.email,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) return { error: error.message };
  return { success: true };
}

export async function createWishAction(
  templateId: string,
  payload: Record<string, string>,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const wish: Partial<Wish> = {
    id: nanoid(10),
    templateId,
    payload,
    createdAt: new Date().toISOString(),
  };

  if (!user) {
    // Guest flow
    const cookieStore = await cookies();
    const guestToken = cookieStore.get("wishena-guest")?.value;
    let sessionId: string | null = null;

    if (guestToken) {
      sessionId = await verifyGuestCookie(guestToken);
    }

    if (!sessionId) {
      const session = await guestWishRepository.createSession();
      sessionId = session.id;
      const newToken = await signGuestSessionId(sessionId);
      cookieStore.set({
        name: "wishena-guest",
        value: newToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    const saved = await guestWishRepository.save(
      sessionId,
      wish as Omit<Wish, "userId">,
    );
    if (!saved) {
      return { error: "guest_limit_reached" };
    }
    return { success: true, id: wish.id };
  }

  // User flow
  const unverified = !user.email_confirmed_at;
  if (unverified) {
    const count = await supabaseWishRepository.getCount(user.id);
    if (count >= 5) {
      return { error: "unverified_limit_reached" };
    }
  }

  const saved = await supabaseWishRepository.save(wish as Wish, user.id);
  if (!saved) {
    return { error: "save_failed" };
  }

  return { success: true, id: wish.id };
}
