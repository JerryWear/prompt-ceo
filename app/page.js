export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b0f14",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
      }}
    >
      <div style={{ width: "100%", maxWidth: 980 }}>
        <h1 style={{ fontSize: 40, fontWeight: 900, margin: 0 }}>Prompt CEO</h1>
        <p style={{ marginTop: 10, opacity: 0.85 }}>
          Choose your app:
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 16,
            marginTop: 22,
          }}
        >
          <a
            href="/prompt-v2"
            style={{
              background: "#0f1620",
              border: "1px solid #223042",
              borderRadius: 18,
              padding: 18,
              textDecoration: "none",
              color: "white",
              boxShadow: "0 10px 24px rgba(0,0,0,0.35)",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 900 }}>Photo App</div>
            <div style={{ marginTop: 8, opacity: 0.85, lineHeight: 1.45 }}>
              Create image prompts: places, poses, clothing, mood, camera.
            </div>
            <div style={{ marginTop: 14, fontWeight: 800 }}>Open Photo Builder →</div>
          </a>

          <a
            href="/video"
            style={{
              background: "#0f1620",
              border: "1px solid #223042",
              borderRadius: 18,
              padding: 18,
              textDecoration: "none",
              color: "white",
              boxShadow: "0 10px 24px rgba(0,0,0,0.35)",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 900 }}>Video App</div>
            <div style={{ marginTop: 8, opacity: 0.85, lineHeight: 1.45 }}>
              Create video prompts using the same structure (video-focused outputs).
            </div>
            <div style={{ marginTop: 14, fontWeight: 800 }}>Open Video Builder →</div>
          </a>
        </div>
      </div>
    </main>
  );
}
