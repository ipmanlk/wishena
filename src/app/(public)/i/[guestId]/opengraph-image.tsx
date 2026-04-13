import { ImageResponse } from "next/og";
import { getInviteTemplateById } from "@/lib/invite-templates";
import { supabaseInviteGuestRepository } from "@/lib/storage/supabase-invite-guest-repository";
import { supabaseInviteRepository } from "@/lib/storage/supabase-invite-repository";

export const runtime = "edge";
export const alt = "Invitation Card";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image(props: {
  params: Promise<{ guestId: string }>;
}) {
  const params = await props.params;

  try {
    const guest = await supabaseInviteGuestRepository.getById(params.guestId);
    if (!guest) throw new Error("Not found");

    const project = await supabaseInviteRepository.getById(guest.projectId);
    if (!project) throw new Error("Not found");

    const template = getInviteTemplateById(project.templateId);
    if (!template) throw new Error("Not found");

    const coupleNames = project.payload.coupleNames || project.title;
    const date = project.payload.date;
    const kind = template.inviteKind;

    return new ImageResponse(
      <div
        style={{
          background:
            kind === "wedding"
              ? "linear-gradient(to bottom, #Fdfbf7, #fdf4f6)"
              : "linear-gradient(to bottom, #18181b, #09090b)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: `2px solid ${kind === "wedding" ? "rgba(156, 106, 108, 0.2)" : "rgba(255, 255, 255, 0.1)"}`,
            padding: "40px",
            margin: "60px",
            width: "calc(100% - 120px)",
            height: "calc(100% - 120px)",
          }}
        >
          <span
            style={{
              fontSize: 30,
              color: kind === "wedding" ? "#738276" : "#A1A1AA",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 40,
            }}
          >
            You're Invited
          </span>
          <span
            style={{
              fontSize: 80,
              color: kind === "wedding" ? "#9c6a6c" : "#ffffff",
              marginBottom: 40,
              textAlign: "center",
            }}
          >
            {coupleNames}
          </span>
          {date && (
            <span
              style={{
                fontSize: 40,
                color: kind === "wedding" ? "#4a4a4a" : "#D4D4D8",
              }}
            >
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}
        </div>
      </div>,
      {
        ...size,
      },
    );
  } catch (_e) {
    // Fallback Image
    return new ImageResponse(
      <div
        style={{
          background: "#fafafa",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: 60, color: "#18181b" }}>You're Invited</span>
      </div>,
      {
        ...size,
      },
    );
  }
}
