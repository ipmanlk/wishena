import { ImageResponse } from "next/og";

export const alt = "Someone sent you a wish!";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle, #ec4899 0%, #020617 70%)",
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
          Someone sent you a wish!
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
      ...size,
    },
  );
}
