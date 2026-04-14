import { Navbar } from "@/components/layout/Navbar";
import { requireUser } from "@/lib/supabase/server";

export default async function MeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUser();

  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
