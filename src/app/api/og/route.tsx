import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get("text") || "A special wish for you!";
  const template = searchParams.get("template") || "neon-birthday";

  const backgrounds: Record<string, string> = {
    "neon-birthday": "radial-gradient(circle, #ec4899 0%, #020617 70%)",
    "gentle-celebration": "linear-gradient(135deg, #fce7f3 0%, #ddd6fe 100%)",
  };

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        background: backgrounds[template] || backgrounds["neon-birthday"],
        padding: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 60,
            fontWeight: "bold",
            color: "white",
            textShadow: "0 0 30px rgba(255,255,255,0.5)",
            lineHeight: 1.2,
          }}
        >
          {text.length > 60 ? `${text.slice(0, 60)}...` : text}
        </div>
        <div
          style={{
            marginTop: 30,
            fontSize: 24,
            color: "rgba(255,255,255,0.8)",
          }}
        >
          Open to view your wish ✨
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
