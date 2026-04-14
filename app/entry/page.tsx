import Link from "next/link";

export default function EntryPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(255,255,255,0.06), transparent 35%), #050505",
        color: "#ffffff",
        padding: "48px 24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              margin: 0,
              fontSize: "12px",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            Prompt CEO
          </p>

          <h1
            style={{
              margin: "12px 0 12px",
              fontSize: "clamp(36px, 6vw, 72px)",
              lineHeight: 1,
              fontWeight: 700,
              letterSpacing: "-0.04em",
            }}
          >
            Choose your engine
          </h1>

          <p
            style={{
              margin: "0 auto",
              maxWidth: "760px",
              fontSize: "18px",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.75)",
            }}
          >
            Build high-converting visual prompts for photos, cinematic video, or
            unlock both together.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          <section
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              borderRadius: "24px",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                App One
              </p>
              <h2
                style={{
                  margin: "10px 0 0",
                  fontSize: "32px",
                  lineHeight: 1.1,
                }}
              >
                Photo
              </h2>
            </div>

            <p
              style={{
                margin: 0,
                color: "rgba(255,255,255,0.72)",
                lineHeight: 1.6,
              }}
            >
              Generate premium photo prompts for influencer content, branding,
              social media, and identity-consistent visual creation.
            </p>

            <div style={{ marginTop: "auto" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  minHeight: "52px",
                  borderRadius: "14px",
                  background: "#ffffff",
                  color: "#050505",
                  fontWeight: 600,
                }}
              >
                Photo routing next
              </span>
            </div>
          </section>

          <section
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              borderRadius: "24px",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                App Two
              </p>
              <h2
                style={{
                  margin: "10px 0 0",
                  fontSize: "32px",
                  lineHeight: 1.1,
                }}
              >
                Video
              </h2>
            </div>

            <p
              style={{
                margin: 0,
                color: "rgba(255,255,255,0.72)",
                lineHeight: 1.6,
              }}
            >
              Build cinematic video prompt flows for motion-first creators,
              reels, short-form storytelling, and premium visual direction.
            </p>

            <div style={{ marginTop: "auto" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  minHeight: "52px",
                  borderRadius: "14px",
                  background: "#ffffff",
                  color: "#050505",
                  fontWeight: 600,
                }}
              >
                Video routing next
              </span>
            </div>
          </section>

          <section
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              borderRadius: "24px",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                Best Value
              </p>
              <h2
                style={{
                  margin: "10px 0 0",
                  fontSize: "32px",
                  lineHeight: 1.1,
                }}
              >
                Bundle
              </h2>
            </div>

            <p
              style={{
                margin: 0,
                color: "rgba(255,255,255,0.72)",
                lineHeight: 1.6,
              }}
            >
              Get the full Prompt CEO system with both engines together for
              creators who want maximum output and flexibility.
            </p>

            <div style={{ marginTop: "auto" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  minHeight: "52px",
                  borderRadius: "14px",
                  background: "#ffffff",
                  color: "#050505",
                  fontWeight: 600,
                }}
              >
                Bundle routing next
              </span>
            </div>
          </section>
        </div>

        <div style={{ textAlign: "center" }}>
          <Link
            href="/"
            style={{
              color: "rgba(255,255,255,0.7)",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Back to app
          </Link>
        </div>
      </div>
    </main>
  );
}