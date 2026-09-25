import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const contentType = "image/png";

const SIZE = { width: 1200, height: 630 } as const;

const PRIMARY_DARK = "#1a3a0a";
const PRIMARY = "#2D5016";
const SAGE = "#8BAD5A";
const CREAM = "#FAF6EE";
const ACCENT = "#C4A862";

const DEFAULT_TITLE = "Central Texas Holistic Care";
const DEFAULT_SUBTITLE = "Holistic medicine and hormone therapy · Killeen, TX";

/**
 * Dynamic Open Graph image route.
 *
 *   /api/og                               , brand default card
 *   /api/og?title=Hormone%20Therapy       , page-specific title
 *   /api/og?title=...&subtitle=...&tag=..., full customization
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = (searchParams.get("title") ?? DEFAULT_TITLE).slice(0, 110);
  const subtitle = (searchParams.get("subtitle") ?? DEFAULT_SUBTITLE).slice(0, 160);
  const tag = (searchParams.get("tag") ?? "CTHC").slice(0, 32);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          background: `linear-gradient(135deg, ${PRIMARY_DARK} 0%, ${PRIMARY} 55%, #244010 100%)`,
          color: CREAM,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* decorative sage glow */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -180,
            width: 520,
            height: 520,
            borderRadius: "9999px",
            background: `radial-gradient(circle, ${SAGE}55 0%, transparent 70%)`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -160,
            left: -160,
            width: 460,
            height: 460,
            borderRadius: "9999px",
            background: `radial-gradient(circle, ${ACCENT}33 0%, transparent 70%)`,
            display: "flex",
          }}
        />

        {/* header row, brand + tag pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              fontSize: 26,
              color: CREAM,
              opacity: 0.85,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "9999px",
                background: SAGE,
                display: "flex",
              }}
            />
            Central Texas Holistic Care
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 22px",
              borderRadius: 9999,
              border: `1px solid ${SAGE}88`,
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: SAGE,
            }}
          >
            {tag}
          </div>
        </div>

        {/* main title block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            maxWidth: 980,
          }}
        >
          <div
            style={{
              fontSize: title.length > 55 ? 64 : 80,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -1,
              color: CREAM,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.35,
              color: `${CREAM}cc`,
              maxWidth: 920,
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            color: `${CREAM}aa`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 9999,
                background: SAGE,
                display: "flex",
              }}
            />
            centraltexasholisticcarepllc.com
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            254-213-2423 · Killeen, TX
          </div>
        </div>
      </div>
    ),
    {
      ...SIZE,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
