import type { Metadata } from "next";
import { Caveat, Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/components/auth/UserProvider";
import { createClient } from "@/lib/supabase/server";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const source = Source_Sans_3({
  variable: "--font-source",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wishena",
  description: "Create and share beautiful wishes",
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${source.variable} ${caveat.variable}`}
    >
      <body className="min-h-screen antialiased">
        <UserProvider serverUser={user}>
          {children}
          {modal}
        </UserProvider>
      </body>
    </html>
  );
}
