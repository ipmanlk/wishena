import { redirect } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { createClient } from "@/lib/supabase/server";

export default async function MeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/me/wishes");
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
