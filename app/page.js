export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background:
          "radial-gradient(1200px 800px at 20% 10%, rgba(120,120,255,0.18), transparent 60%), radial-gradient(900px 700px at 80% 30%, rgba(255,120,200,0.12), transparent 55%), #07080c",
        color: "white",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
      }}
    >
      <div style={{ width: "100%", maxWidth: 980 }}>
        {/* Header */}
        <div style={{ marginBottom: 18 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 12px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span style={{ fontSize: 12, opacity: 0.85 }}>
              Photo + Video Prompt Builder
            </span>
          </div>

          <h1
            style={{
              marginTop: 14,
              marginBottom: 10,
              fontSize: 46,
              lineHeight: 1.05,
              letterSpacing: -1,
            }}
          >
            Prompt CEO
          </h1>

          <p style={{ margin: 0, fontSize: 16, opacity: 0.85, maxWidth: 720 }}>
            Choose your app. Generate structured prompts fast. Built for creators
            and teams who want consistent results.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
            marginTop: 22,
          }}
        >
          {/* Photo */}
          <a
            href="/prompt-v2"
            style={{
              textDecoration: "none",
              color: "inherit",
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.04)",
              padding: 18,
              display: "block",
              transition: "transform 120ms ease, border-color 120ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 10 }}>🖼️</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>
              Photo App
            </div>
            <div style={{ fontSize: 13, opacity: 0.78, lineHeight: 1.45 }}>
              Build high-quality image prompts with presets, styles, and
              structured output. Best for Instagram, Fanvue, product shots, and
              brand visuals.
            </div>

            <div
              style={{
                marginTop: 14,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 12,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Open Photo Builder <span style={{ opacity: 0.9 }}>→</span>
            </div>
          </a>

          {/* Video */}
          <a
            href="/video"
            style={{
              textDecoration: "none",
              color: "inherit",
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.04)",
              padding: 18,
              display: "block",
              transition: "transform 120ms ease, border-color 120ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 10 }}>🎥</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>
              Video App
            </div>
            <div style={{ fontSize: 13, opacity: 0.78, lineHeight: 1.45 }}>
              Generate video prompts with camera movement, pacing, scene beats,
              and cinematic direction. Built for reels, ads, and story content.
            </div>

            <div
              style={{
                marginTop: 14,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 12,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Open Video Builder <span style={{ opacity: 0.9 }}>→</span>
            </div>
          </a>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 22,
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "space-between",
            alignItems: "center",
            opacity: 0.8,
            fontSize: 12,
          }}
        >
          <div>© {new Date().getFullYear()} Prompt CEO</div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span
              style={{
                padding: "6px 10px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              Plans: Soft • Fanvue • Unrestricted
            </span>
            <span style={{ opacity: 0.7 }}>
              Live: prompt-ceo.vercel.app
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}