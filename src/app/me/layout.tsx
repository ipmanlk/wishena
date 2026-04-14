import { redirect } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { getUser } from "@/lib/supabase/server";

export default async function MeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getUser();

  if (!user) {
    redirect("/auth/login?next=/me");
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
