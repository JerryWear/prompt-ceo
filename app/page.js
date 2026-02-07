export const dynamic = "force-dynamic";

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(1200px 600px at 20% 10%, rgba(94, 234, 212, 0.12), transparent 55%), radial-gradient(900px 500px at 80% 20%, rgba(99, 102, 241, 0.14), transparent 60%), #070b10",
    color: "white",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
  },
  wrap: { maxWidth: 1100, margin: "0 auto", padding: "48px 22px 64px" },
  topRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    flexWrap: "wrap",
    marginBottom: 26,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  logo: {
    width: 42,
    height: 42,
    borderRadius: 14,
    background:
      "linear-gradient(135deg, rgba(99,102,241,0.95), rgba(94,234,212,0.85))",
    boxShadow: "0 18px 45px rgba(0,0,0,0.35)",
    border: "1px solid rgba(255,255,255,0.14)",
  },
  brandText: { lineHeight: 1.05 },
  brandName: { fontSize: 14, opacity: 0.85, margin: 0, fontWeight: 800 },
  title: { fontSize: 44, fontWeight: 950, margin: "8px 0 0" },
  subtitle: {
    marginTop: 10,
    opacity: 0.86,
    maxWidth: 720,
    lineHeight: 1.45,
    fontSize: 15,
  },
  badges: { display: "flex", gap: 10, flexWrap: "wrap" },
  badge: {
    padding: "8px 12px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 0.2,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
    gap: 18,
    marginTop: 18,
  },
  card: {
    position: "relative",
    borderRadius: 20,
    padding: 18,
    background: "rgba(15, 22, 32, 0.75)",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.38)",
    backdropFilter: "blur(10px)",
    overflow: "hidden",
    transition: "transform .18s ease, border-color .18s ease, box-shadow .18s ease",
  },
  cardGlow: {
    position: "absolute",
    inset: -1,
    background:
      "radial-gradient(700px 220px at 20% 0%, rgba(94,234,212,0.16), transparent 55%), radial-gradient(700px 220px at 80% 0%, rgba(99,102,241,0.18), transparent 55%)",
    pointerEvents: "none",
    opacity: 0.9,
  },
  cardInner: { position: "relative" },
  cardTitleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  cardTitle: { fontSize: 18, fontWeight: 950, margin: 0 },
  pill: {
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 900,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.14)",
    opacity: 0.95,
  },
  cardDesc: { marginTop: 10, opacity: 0.86, lineHeight: 1.5, fontSize: 14 },
  list: { marginTop: 12, paddingLeft: 16, opacity: 0.92, lineHeight: 1.55, fontSize: 13 },
  ctaRow: { display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 },
  cta: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: "11px 14px",
    borderRadius: 14,
    textDecoration: "none",
    fontWeight: 950,
    fontSize: 13,
    border: "1px solid rgba(255,255,255,0.16)",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    transition: "transform .18s ease, background .18s ease, border-color .18s ease",
  },
  ctaPrimary: {
    background: "white",
    color: "#070b10",
    border: "1px solid rgba(255,255,255,0.55)",
  },
  section: {
    marginTop: 26,
    borderRadius: 20,
    padding: 18,
    background: "rgba(15, 22, 32, 0.55)",
    border: "1px solid rgba(255,255,255,0.10)",
    boxShadow: "0 20px 55px rgba(0,0,0,0.28)",
  },
  sectionTitle: { margin: 0, fontSize: 14, fontWeight: 950, opacity: 0.92 },
  tierGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 12,
    marginTop: 12,
  },
  tier: {
    borderRadius: 16,
    padding: 14,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.10)",
  },
  tierName: { margin: 0, fontWeight: 950, fontSize: 14 },
  tierText: { marginTop: 6, opacity: 0.86, fontSize: 13, lineHeight: 1.45 },
  footer: { marginTop: 22, opacity: 0.7, fontSize: 12, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 },
};

function Card({ title, pill, desc, bullets, href, secondaryHref }) {
  return (
    <div
      style={styles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.20)";
        e.currentTarget.style.boxShadow = "0 26px 70px rgba(0,0,0,0.48)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
        e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.38)";
      }}
    >
      <div style={styles.cardGlow} />
      <div style={styles.cardInner}>
        <div style={styles.cardTitleRow}>
          <h2 style={styles.cardTitle}>{title}</h2>
          <div style={styles.pill}>{pill}</div>
        </div>

        <p style={styles.cardDesc}>{desc}</p>

        <ul style={styles.list}>
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>

        <div style={styles.ctaRow}>
          <a
            href={href}
            style={{ ...styles.cta, ...styles.ctaPrimary }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0px)")}
          >
            Open App <span style={{ opacity: 0.85 }}>→</span>
          </a>

          {secondaryHref ? (
            <a
              href={secondaryHref}
              style={styles.cta}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0px)")}
            >
              View Demo <span style={{ opacity: 0.85 }}>↗</span>
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main style={styles.page}>
      <div style={styles.wrap}>
        <div style={styles.topRow}>
          <div style={styles.brand}>
            <div style={styles.logo} />
            <div style={styles.brandText}>
              <p style={styles.brandName}>Prompt CEO</p>
              <h1 style={styles.title}>Premium Prompt Tools</h1>
              <p style={styles.subtitle}>
                A clean, structured prompt system built for creators who want consistent results.
                Choose Photo or Video — then generate high-quality prompts in seconds.
              </p>
            </div>
          </div>

          <div style={styles.badges}>
            <div style={styles.badge}>⚡ Fast Generation</div>
            <div style={styles.badge}>🔒 Membership Protected</div>
            <div style={styles.badge}>✨ Constant Updates</div>
          </div>
        </div>

        <div style={styles.grid}>
          <Card
            title="Photo App"
            pill="Image prompts"
            desc="Generate clean, consistent image prompts with the same premium structure every time."
            bullets={[
              "Places, clothing, mood & camera built in",
              "Anti-repeat + locked structure",
              "Perfect for daily content output",
            ]}
            href="/prompt-v2"
            secondaryHref="/prompt-v2"
          />

          <Card
            title="Video App"
            pill="Video prompts"
            desc="Video-focused prompting with the same structure — built for short-form creators."
            bullets={[
              "Prompt structure optimized for clips",
              "Consistent scenes + action cues",
              "Designed for repeatable series content",
            ]}
            href="/video"
            secondaryHref="/video"
          />
        </div>

        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>Membership tiers (Shopify)</h3>
          <div style={styles.tierGrid}>
            <div style={styles.tier}>
              <p style={styles.tierName}>Tier 1 — Photo</p>
              <p style={styles.tierText}>
                Access the Photo App only. Perfect for image content and daily prompt creation.
              </p>
            </div>
            <div style={styles.tier}>
              <p style={styles.tierName}>Tier 2 — Video</p>
              <p style={styles.tierText}>
                Access the Video App only. Built for reels/shorts workflows and series creation.
              </p>
            </div>
            <div style={styles.tier}>
              <p style={styles.tierName}>Tier 3 — Bundle</p>
              <p style={styles.tierText}>
                Full access to Photo + Video. Best value for creators posting across formats.
              </p>
            </div>
          </div>
        </section>

        <div style={styles.footer}>
          <div>© {new Date().getFullYear()} Prompt CEO</div>
          <div>Built for consistent results • Fast • Clean • Premium</div>
        </div>
      </div>
    </main>
  );
}
