import { ImageResponse } from "next/og";
import { FLORIDA_SILHOUETTE, MARK_STAR } from "@/components/brand/Mark";
import { site } from "@/content/site";
import { formatDateRange, getCurrentEdition } from "@/lib/content";

// Link-preview image (LinkedIn, iMessage, Slack…), generated at build time.
export const alt = `${site.name} — March 26–27, 2027, Gainesville, Florida`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const edition = getCurrentEdition();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "72px 84px",
          background: "#08111C",
          color: "#EAF0F5",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 720 }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1, letterSpacing: -1, textTransform: "uppercase" }}>
            Florida National Security Summit
          </div>
          <div style={{ marginTop: 28, fontSize: 32, color: "#B8C3CD" }}>{site.supportingLine}</div>
          <div style={{ marginTop: 44, fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: "#9FD3FF" }}>
            {`${formatDateRange(edition.startDate, edition.endDate)} · ${edition.city}, Florida`}
          </div>
        </div>
        <svg width="300" height="300" viewBox="0 0 100 100">
          <path d={FLORIDA_SILHOUETTE} fill="#EAF0F5" />
          <path d={MARK_STAR} fill="#08111C" />
        </svg>
      </div>
    ),
    size,
  );
}
