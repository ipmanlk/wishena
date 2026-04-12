import type { Metadata } from "next";

interface LayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  return {
    title: "Someone sent you a wish! ✨",
    description: "Open to view your special message",
    openGraph: {
      images: [
        `/api/og?text=Someone%20sent%20you%20a%20wish&template=neon-birthday&id=${params.id}`,
      ],
    },
  };
}

export default function WishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
