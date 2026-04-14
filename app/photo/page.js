"use client"

import Link from "next/link"

export default function PhotoPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: `
          radial-gradient(circle at 20% 10%, rgba(120,80,200,0.15), transparent 40%),
          radial-gradient(circle at 80% 90%, rgba(60,80,160,0.12), transparent 40%),
          linear-gradient(180deg, #05060a, #080a12)
        `,
        color: "#ffffff",
        fontFamily: "Arial, Helvetica, sans-serif",
        padding: "80px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "60px" }}>
          <p style={{ opacity: 0.6, letterSpacing: "2px", fontSize: "12px" }}>
            PROMPT CEO — PHOTO ENGINE
          </p>

          <h1
            style={{
              fontSize: "clamp(42px, 6vw, 72px)",
              margin: "10px 0 20px",
              lineHeight: 1,
            }}
          >
            Build High-Converting Photo Prompts
          </h1>

          <p
            style={{
              maxWidth: "700px",
              opacity: 0.7,
              fontSize: "18px",
              lineHeight: 1.6,
            }}
          >
            Create cinematic, identity-consistent visual prompts for creators,
            influencers, and brands. Generate content that looks premium,
            aligned, and scalable across all platforms.
          </p>
        </div>

        {/* Features */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
            marginBottom: "60px",
          }}
        >
          {[
            {
              title: "Identity Lock",
              text: "Keep the same face, body, and presence across every image — no inconsistency.",
            },
            {
              title: "Cinematic Scenes",
              text: "Generate high-end environments, lighting, and compositions automatically.",
            },
            {
              title: "Influencer Ready",
              text: "Built for creators who want aesthetic, premium, and viral-ready content.",
            },
            {
              title: "Fast Output",
              text: "Create multiple high-quality prompts in seconds with zero friction.",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding: "24px",
                borderRadius: "20px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <h3 style={{ marginBottom: "10px" }}>{item.title}</h3>
              <p style={{ opacity: 0.7, fontSize: "14px" }}>{item.text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          <Link
            href="/prompt-v2"
            style={{
              display: "inline-block",
              padding: "18px 34px",
              borderRadius: "14px",
              background: "#ffffff",
              color: "#000",
              fontWeight: "700",
              fontSize: "16px",
              textDecoration: "none",
              marginBottom: "20px",
            }}
          >
            Enter Photo Engine →
          </Link>

          <div>
            <Link href="/entry" style={{ opacity: 0.6 }}>
              ← Back to selection
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}