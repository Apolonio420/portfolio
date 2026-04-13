import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Valentin Nunez — AI Agent & Full-Stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Glow effects */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "20%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "20%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Name */}
        <div
          style={{
            display: "flex",
            fontSize: "72px",
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-2px",
            marginBottom: "8px",
          }}
        >
          Valentin Nunez
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: "28px",
            fontWeight: 500,
            color: "#60a5fa",
            marginBottom: "40px",
          }}
        >
          AI Agent & Full-Stack Engineer
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: "48px",
            color: "#a1a1aa",
            fontSize: "18px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ color: "#ffffff", fontSize: "32px", fontWeight: 700 }}>300+</span>
            <span>Tools Built</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ color: "#ffffff", fontSize: "32px", fontWeight: 700 }}>7.4B</span>
            <span>Tokens Processed</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ color: "#ffffff", fontSize: "32px", fontWeight: 700 }}>2,000+</span>
            <span>Hours AI Pairing</span>
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            display: "flex",
            marginTop: "40px",
            padding: "12px 32px",
            borderRadius: "999px",
            background: "rgba(59,130,246,0.2)",
            border: "1px solid rgba(59,130,246,0.3)",
            color: "#60a5fa",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          portfoliovnunez.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
