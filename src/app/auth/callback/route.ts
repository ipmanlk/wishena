import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { verifyGuestCookie } from "@/lib/guest/session";
import { guestWishRepository } from "@/lib/guest/guest-wish-repository";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/my-wishes";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
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

      const isVerify =
        request.url.includes("type=signup") ||
        request.url.includes("type=recovery") ||
        searchParams.has("type");
      if (isVerify && searchParams.get("type") === "signup") {
        return NextResponse.redirect(`${origin}/auth/verify`);
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(
    `${origin}/auth/login?error=Invalid+magic+link+or+code`,
  );
}
