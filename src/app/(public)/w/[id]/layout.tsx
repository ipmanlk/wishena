import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Someone sent you a wish! ✨",
  description: "Open to view your special message",
};

export default function WishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
