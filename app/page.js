"use client";

export default function Home() {
  return (
    <main className="page">
      <div className="wrap">
        <div className="topRow">
          <div className="brand">
            <div className="logo" />
            <div className="brandText">
              <p className="brandName">Prompt CEO</p>
              <h1 className="title">Premium Prompt Tools</h1>
              <p className="subtitle">
                A clean, structured prompt system built for creators who want consistent results.
                Choose Photo or Video — then generate high-quality prompts in seconds.
              </p>
            </div>
          </div>

          <div className="badges">
            <div className="badge">⚡ Fast Generation</div>
            <div className="badge">🔒 Membership Protected</div>
            <div className="badge">✨ Constant Updates</div>
          </div>
        </div>

        <div className="grid">
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
          />
        </div>

        <section className="section">
          <h3 className="sectionTitle">Membership tiers (Shopify)</h3>
          <div className="tierGrid">
            <div className="tier">
              <p className="tierName">Tier 1 — Photo</p>
              <p className="tierText">
                Access the Photo App only. Perfect for image content and daily prompt creation.
              </p>
            </div>
            <div className="tier">
              <p className="tierName">Tier 2 — Video</p>
              <p className="tierText">
                Access the Video App only. Built for reels/shorts workflows and series creation.
              </p>
            </div>
            <div className="tier">
              <p className="tierName">Tier 3 — Bundle</p>
              <p className="tierText">
                Full access to Photo + Video. Best value for creators posting across formats.
              </p>
            </div>
          </div>
        </section>

        <div className="footer">
          <div>© {new Date().getFullYear()} Prompt CEO</div>
          <div>Built for consistent results • Fast • Clean • Premium</div>
        </div>
      </div>

      <style jsx global>{`
        .page {
          min-height: 100vh;
          background:
            radial-gradient(1200px 600px at 20% 10%, rgba(94, 234, 212, 0.12), transparent 55%),
            radial-gradient(900px 500px at 80% 20%, rgba(99, 102, 241, 0.14), transparent 60%),
            #070b10;
          color: #fff;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
        }
        .wrap { max-width: 1100px; margin: 0 auto; padding: 48px 22px 64px; }
        .topRow { display:flex; align-items:flex-start; justify-content:space-between; gap:16px; flex-wrap:wrap; margin-bottom:26px; }
        .brand { display:flex; align-items:center; gap:12px; }
        .logo {
          width:42px; height:42px; border-radius:14px;
          background: linear-gradient(135deg, rgba(99,102,241,0.95), rgba(94,234,212,0.85));
          box-shadow: 0 18px 45px rgba(0,0,0,0.35);
          border: 1px solid rgba(255,255,255,0.14);
        }
        .brandText { line-height: 1.05; }
        .brandName { font-size:14px; opacity:0.85; margin:0; font-weight:800; }
        .title { font-size:44px; font-weight:950; margin:8px 0 0; letter-spacing:-0.3px; }
        .subtitle { margin-top:10px; opacity:0.86; max-width:720px; line-height:1.45; font-size:15px; }

        .badges { display:flex; gap:10px; flex-wrap:wrap; }
        .badge {
          padding:8px 12px; border-radius:999px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          font-size:12px; font-weight:800; letter-spacing:0.2px;
        }

        .grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(330px, 1fr)); gap:18px; margin-top:18px; }

        .card {
          position:relative;
          border-radius:20px;
          padding:18px;
          background: rgba(15, 22, 32, 0.75);
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 20px 60px rgba(0,0,0,0.38);
          backdrop-filter: blur(10px);
          overflow:hidden;
          transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease;
        }
        .card:hover {
          transform: translateY(-3px);
          border-color: rgba(255,255,255,0.20);
          box-shadow: 0 26px 70px rgba(0,0,0,0.48);
        }
        .cardGlow {
          position:absolute; inset:-1px;
          background:
            radial-gradient(700px 220px at 20% 0%, rgba(94,234,212,0.16), transparent 55%),
            radial-gradient(700px 220px at 80% 0%, rgba(99,102,241,0.18), transparent 55%);
          pointer-events:none;
          opacity:0.9;
        }
        .cardInner { position:relative; }
        .cardTitleRow { display:flex; align-items:center; justify-content:space-between; gap:12px; }
        .cardTitle { font-size:18px; font-weight:950; margin:0; }
        .pill {
          padding:6px 10px; border-radius:999px;
          font-size:12px; font-weight:900;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.14);
          opacity:0.95;
        }
        .cardDesc { margin-top:10px; opacity:0.86; line-height:1.5; font-size:14px; }
        .list { margin-top:12px; padding-left:16px; opacity:0.92; line-height:1.55; font-size:13px; }

        .ctaRow { display:flex; gap:12px; flex-wrap:wrap; margin-top:16px; }
        .cta {
          display:inline-flex; align-items:center; justify-content:center; gap:10px;
          padding:11px 14px; border-radius:14px; text-decoration:none;
          font-weight:950; font-size:13px;
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(255,255,255,0.08);
          color:#fff;
          transition: transform .18s ease, background .18s ease, border-color .18s ease;
        }
        .cta:hover { transform: translateY(-1px); border-color: rgba(255,255,255,0.22); }
        .ctaPrimary {
          background:#fff; color:#070b10;
          border: 1px solid rgba(255,255,255,0.55);
        }
        .ctaPrimary:hover { background: rgba(255,255,255,0.92); }

        .section {
          margin-top:26px; border-radius:20px; padding:18px;
          background: rgba(15, 22, 32, 0.55);
          border: 1px solid rgba(255,255,255,0.10);
          box-shadow: 0 20px 55px rgba(0,0,0,0.28);
        }
        .sectionTitle { margin:0; font-size:14px; font-weight:950; opacity:0.92; }
        .tierGrid { display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:12px; margin-top:12px; }
        .tier {
          border-radius:16px; padding:14px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.10);
        }
        .tierName { margin:0; font-weight:950; font-size:14px; }
        .tierText { margin-top:6px; opacity:0.86; font-size:13px; line-height:1.45; }

        .footer { margin-top:22px; opacity:0.7; font-size:12px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:10px; }
      `}</style>
    </main>
  );
}

function Card({ title, pill, desc, bullets, href }) {
  return (
    <div className="card">
      <div className="cardGlow" />
      <div className="cardInner">
        <div className="cardTitleRow">
          <h2 className="cardTitle">{title}</h2>
          <div className="pill">{pill}</div>
        </div>

        <p className="cardDesc">{desc}</p>

        <ul className="list">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>

        <div className="ctaRow">
          <a className="cta ctaPrimary" href={href}>
            Open App <span style={{ opacity: 0.85 }}>→</span>
          </a>
          <a className="cta" href={href}>
            View <span style={{ opacity: 0.85 }}>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
