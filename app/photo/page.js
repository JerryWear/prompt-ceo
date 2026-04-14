"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const featureCards = [
  {
    eyebrow: "IDENTITY LOCK",
    title: "Same exact person. Not random faces.",
    text:
      "Prompt CEO is built for identity continuity. The goal is not to generate a different person every time. The goal is to preserve the same exact visual self across outputs with far stronger control over facial consistency, presence, and character feel.",
  },
  {
    eyebrow: "BODY + PRESENCE CONTROL",
    title: "Your physique, aesthetic, and energy stay intentional.",
    text:
      "This is where visual creation becomes strategic. Users are not chasing lucky outputs. They are shaping a controlled digital version of themselves with stronger body consistency, stronger aesthetic direction, and stronger visual authority.",
  },
  {
    eyebrow: "WORLD CONTINUITY",
    title: "One identity across many worlds.",
    text:
      "Luxury, fitness, travel, lifestyle, creator fantasy, cinematic story environments — all without losing the person. Prompt CEO keeps the identity grounded while the world expands around it.",
  },
  {
    eyebrow: "ADVANTAGE",
    title: "This is not content generation. This is visual leverage.",
    text:
      "The power is not just prettier images. The power is repeatability. Continuity. Recognition. Presence. The ability to build a high-value digital identity that looks deliberate instead of random.",
  },
];

const workflowCards = [
  {
    step: "01",
    title: "Upload identity",
    text:
      "Start from a real reference. Prompt CEO is built around preserving the person, not replacing them.",
  },
  {
    step: "02",
    title: "Control the world",
    text:
      "Choose the aesthetic, the energy, the environment, the continuity, and the level of visual direction.",
  },
  {
    step: "03",
    title: "Generate with intention",
    text:
      "Move into prompt creation with stronger identity retention, stronger visual coherence, and a more premium final result.",
  },
];

export default function PhotoPage() {
  const [activeCard, setActiveCard] = useState(null);

  const backgroundOrbs = useMemo(
    () => [
      { top: "10%", left: "8%", size: 300, delay: "0s" },
      { top: "22%", right: "10%", size: 360, delay: "1.2s" },
      { bottom: "18%", left: "18%", size: 280, delay: "2.1s" },
      { bottom: "8%", right: "12%", size: 420, delay: "0.8s" },
    ],
    []
  );

  return (
    <main className="photo-page">
      <div className="photo-bg-grid" />
      <div className="photo-bg-noise" />

      {backgroundOrbs.map((orb, index) => (
        <div
          key={index}
          className="photo-orb"
          style={{
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            width: orb.size,
            height: orb.size,
            animationDelay: orb.delay,
          }}
        />
      ))}

      <section className="hero-shell">
        <div className="hero-panel">
          <div className="hero-copy">
            <div className="hero-kicker">
              PROMPT CEO / PHOTO SYSTEM
            </div>

            <h1 className="hero-title">
              Build the controlled digital version of yourself.
            </h1>

            <p className="hero-subtitle">
              Prompt CEO Photo is not a cheap prompt page and it is not a random
              image generator. It is an identity, continuity, world, and visual
              control system designed for people who want premium outputs that
              still feel like them.
            </p>

            <p className="hero-subtitle secondary">
              Same exact face. Same exact body logic. Same presence. Same
              aesthetic direction. Stronger continuity across worlds. That is
              the real advantage.
            </p>

            <div className="hero-actions">
              <Link href="/prompt-v2" className="primary-cta">
                Enter Prompt CEO Photo
                <span className="cta-arrow">→</span>
              </Link>

              <Link href="/entry" className="secondary-cta">
                Back to Entry
              </Link>
            </div>

            <div className="hero-metrics">
              <div className="metric-card">
                <span className="metric-label">SYSTEM</span>
                <span className="metric-value">Identity-first</span>
              </div>
              <div className="metric-card">
                <span className="metric-label">OUTPUT STYLE</span>
                <span className="metric-value">Controlled, premium, repeatable</span>
              </div>
              <div className="metric-card">
                <span className="metric-label">REAL ADVANTAGE</span>
                <span className="metric-value">Continuity over randomness</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-frame">
              <div className="visual-badge">PREMIUM IMAGE CONTROL</div>

              <div className="visual-stack">
                <div className="stack-card card-a">
                  <span className="stack-label">IDENTITY</span>
                  <strong>Same exact face</strong>
                </div>

                <div className="stack-card card-b">
                  <span className="stack-label">PHYSIQUE</span>
                  <strong>Body consistency</strong>
                </div>

                <div className="stack-card card-c">
                  <span className="stack-label">AESTHETIC</span>
                  <strong>Presence + style continuity</strong>
                </div>

                <div className="stack-card card-d">
                  <span className="stack-label">WORLD</span>
                  <strong>Luxury, fitness, lifestyle, story</strong>
                </div>
              </div>

              <div className="visual-glow-ring" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="section-head">
          <div className="section-kicker">WHY THIS PAGE MUST HIT HARD</div>
          <h2 className="section-title">
            This product should feel like an unfair advantage.
          </h2>
          <p className="section-text">
            Most AI image flows feel disposable. Prompt CEO Photo should feel
            like the opposite: deliberate, controlled, luxurious, and dangerous
            in the hands of someone building a visual identity on purpose.
          </p>
        </div>

        <div className="feature-grid">
          {featureCards.map((card, index) => (
            <article
              key={card.title}
              className={`feature-card ${activeCard === index ? "active" : ""
                }`}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="feature-topline">{card.eyebrow}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <div className="feature-glow" />
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="system-panel">
          <div className="system-left">
            <div className="section-kicker">THE CORE TRUTH</div>
            <h2 className="section-title">
              Users are not generating random images. They are building a
              controlled version of themselves.
            </h2>
            <p className="section-text">
              That changes everything. Once the identity is treated as a system,
              the output becomes more valuable. More recognizable. More usable.
              More premium. The visual self stays anchored while worlds,
              aesthetics, moods, and scenarios evolve around it.
            </p>
          </div>

          <div className="system-right">
            <div className="system-list">
              <div className="system-row">
                <span className="system-dot" />
                <div>
                  <strong>Same face continuity</strong>
                  <p>Built to preserve identity instead of drifting into strangers.</p>
                </div>
              </div>

              <div className="system-row">
                <span className="system-dot" />
                <div>
                  <strong>Same body and presence logic</strong>
                  <p>Visual power stays coherent instead of changing at random.</p>
                </div>
              </div>

              <div className="system-row">
                <span className="system-dot" />
                <div>
                  <strong>Controlled aesthetic direction</strong>
                  <p>Luxury, fitness, creator, editorial, cinematic, or lifestyle worlds.</p>
                </div>
              </div>

              <div className="system-row">
                <span className="system-dot" />
                <div>
                  <strong>World expansion without identity loss</strong>
                  <p>The person remains the person while the visual universe grows.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="section-head narrow">
          <div className="section-kicker">HOW IT FLOWS</div>
          <h2 className="section-title">
            Built like a premium system, not a toy.
          </h2>
        </div>

        <div className="workflow-grid">
          {workflowCards.map((item) => (
            <article key={item.step} className="workflow-card">
              <div className="workflow-step">{item.step}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta-shell">
        <div className="final-cta-panel">
          <div className="final-copy">
            <div className="section-kicker">ENTER THE SYSTEM</div>
            <h2 className="final-title">
              Stop generating random images.
              <br />
              Start building a visual identity that holds.
            </h2>
            <p className="final-text">
              Move into Prompt CEO Photo and create with stronger control,
              stronger continuity, and a more premium result.
            </p>
          </div>

          <div className="final-actions">
            <Link href="/prompt-v2" className="primary-cta large">
              Continue to /prompt-v2
              <span className="cta-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .photo-page {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(circle at top, rgba(153, 122, 255, 0.12), transparent 30%),
            radial-gradient(circle at 80% 20%, rgba(64, 196, 255, 0.12), transparent 28%),
            linear-gradient(180deg, #07080c 0%, #090b12 35%, #06070a 100%);
          color: #f5f7fb;
        }

        .photo-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 42px 42px;
          mask-image: radial-gradient(circle at center, black 35%, transparent 85%);
          opacity: 0.18;
          pointer-events: none;
        }

        .photo-bg-noise {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 12px 12px;
          opacity: 0.07;
          pointer-events: none;
        }

        .photo-orb {
          position: absolute;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(125, 92, 255, 0.2), transparent 70%);
          filter: blur(34px);
          pointer-events: none;
          animation: floatOrb 10s ease-in-out infinite;
        }

        .hero-shell,
        .section-shell,
        .final-cta-shell {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding-left: 24px;
          padding-right: 24px;
        }

        .hero-shell {
          padding-top: 48px;
          padding-bottom: 40px;
        }

        .hero-panel {
          display: grid;
          grid-template-columns: 1.12fr 0.88fr;
          gap: 28px;
          align-items: stretch;
          padding: 34px;
          border-radius: 32px;
          border: 1px solid rgba(255,255,255,0.08);
          background:
            linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)),
            linear-gradient(135deg, rgba(113, 89, 255, 0.08), rgba(0,0,0,0) 45%),
            rgba(8, 10, 16, 0.88);
          box-shadow:
            0 30px 90px rgba(0,0,0,0.42),
            inset 0 1px 0 rgba(255,255,255,0.08);
          backdrop-filter: blur(14px);
        }

        .hero-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
        }

        .hero-kicker,
        .section-kicker {
          display: inline-flex;
          align-items: center;
          width: fit-content;
          padding: 8px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          font-size: 11px;
          letter-spacing: 0.16em;
          font-weight: 700;
          color: rgba(255,255,255,0.76);
          text-transform: uppercase;
          margin-bottom: 18px;
        }

        .hero-title {
          margin: 0;
          font-size: clamp(42px, 6vw, 82px);
          line-height: 0.96;
          letter-spacing: -0.04em;
          font-weight: 800;
          max-width: 11ch;
          text-wrap: balance;
        }

        .hero-subtitle {
          margin: 22px 0 0;
          max-width: 760px;
          font-size: 18px;
          line-height: 1.7;
          color: rgba(230, 235, 245, 0.84);
        }

        .hero-subtitle.secondary {
          color: rgba(255,255,255,0.68);
          max-width: 720px;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 28px;
        }

        .primary-cta,
        .secondary-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 54px;
          padding: 0 22px;
          border-radius: 16px;
          text-decoration: none;
          transition:
            transform 180ms ease,
            border-color 180ms ease,
            box-shadow 180ms ease,
            background 180ms ease,
            color 180ms ease;
          will-change: transform;
        }

        .primary-cta {
          color: #0b0f18;
          font-weight: 800;
          background:
            linear-gradient(135deg, #ffffff 0%, #ccd7ff 50%, #aab9ff 100%);
          box-shadow:
            0 14px 40px rgba(154, 166, 255, 0.22),
            inset 0 1px 0 rgba(255,255,255,0.75);
        }

        .primary-cta:hover {
          transform: translateY(-2px) scale(1.01);
          box-shadow:
            0 20px 60px rgba(154, 166, 255, 0.3),
            0 0 0 1px rgba(255,255,255,0.1),
            inset 0 1px 0 rgba(255,255,255,0.8);
        }

        .secondary-cta {
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.035);
          color: #f1f5fb;
          font-weight: 700;
        }

        .secondary-cta:hover {
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.26);
          background: rgba(255,255,255,0.07);
          box-shadow: 0 12px 34px rgba(0,0,0,0.22);
        }

        .cta-arrow {
          font-size: 18px;
          line-height: 1;
        }

        .hero-metrics {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin-top: 28px;
        }

        .metric-card {
          padding: 16px 16px 18px;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.08);
          background:
            linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025));
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
        }

        .metric-label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .metric-value {
          display: block;
          font-size: 15px;
          line-height: 1.45;
          color: #f5f7fb;
          font-weight: 700;
        }

        .hero-visual {
          min-width: 0;
        }

        .visual-frame {
          position: relative;
          height: 100%;
          min-height: 560px;
          padding: 24px;
          border-radius: 30px;
          border: 1px solid rgba(255,255,255,0.08);
          background:
            radial-gradient(circle at top right, rgba(105, 130, 255, 0.16), transparent 30%),
            radial-gradient(circle at bottom left, rgba(147, 88, 255, 0.14), transparent 34%),
            linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015)),
            rgba(7, 9, 14, 0.95);
          overflow: hidden;
          box-shadow:
            0 24px 70px rgba(0,0,0,0.35),
            inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .visual-badge {
          position: relative;
          z-index: 2;
          width: fit-content;
          padding: 8px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.05);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.8);
          text-transform: uppercase;
        }

        .visual-stack {
          position: relative;
          z-index: 2;
          display: grid;
          gap: 16px;
          margin-top: 28px;
          padding-top: 20px;
        }

        .stack-card {
          position: relative;
          padding: 22px;
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,0.08);
          background:
            linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.025));
          box-shadow:
            0 18px 44px rgba(0,0,0,0.26),
            inset 0 1px 0 rgba(255,255,255,0.05);
          transition: transform 220ms ease, border-color 220ms ease, background 220ms ease;
        }

        .stack-card:hover {
          transform: translateY(-4px) scale(1.01);
          border-color: rgba(255,255,255,0.18);
          background:
            linear-gradient(180deg, rgba(255,255,255,0.11), rgba(255,255,255,0.035));
        }

        .stack-label {
          display: block;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          margin-bottom: 10px;
          font-weight: 700;
        }

        .stack-card strong {
          display: block;
          font-size: 20px;
          line-height: 1.25;
          color: #ffffff;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .card-a {
          margin-left: 0;
          max-width: 88%;
        }

        .card-b {
          margin-left: auto;
          max-width: 82%;
        }

        .card-c {
          margin-left: 4%;
          max-width: 90%;
        }

        .card-d {
          margin-left: auto;
          max-width: 86%;
        }

        .visual-glow-ring {
          position: absolute;
          inset: auto;
          right: -90px;
          bottom: -90px;
          width: 320px;
          height: 320px;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(124, 96, 255, 0.26), transparent 68%);
          filter: blur(20px);
          pointer-events: none;
        }

        .section-shell {
          padding-top: 26px;
          padding-bottom: 26px;
        }

        .section-head {
          max-width: 860px;
          margin-bottom: 24px;
        }

        .section-head.narrow {
          max-width: 720px;
        }

        .section-title {
          margin: 0;
          font-size: clamp(28px, 4vw, 52px);
          line-height: 1.02;
          letter-spacing: -0.03em;
          font-weight: 800;
          color: #f8faff;
        }

        .section-text {
          margin: 16px 0 0;
          font-size: 17px;
          line-height: 1.75;
          color: rgba(232, 236, 245, 0.76);
          max-width: 760px;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .feature-card {
          position: relative;
          padding: 26px;
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.08);
          background:
            linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)),
            rgba(10, 12, 18, 0.82);
          overflow: hidden;
          transition:
            transform 220ms ease,
            border-color 220ms ease,
            box-shadow 220ms ease,
            background 220ms ease;
          box-shadow:
            0 16px 40px rgba(0,0,0,0.24),
            inset 0 1px 0 rgba(255,255,255,0.05);
        }

        .feature-card:hover,
        .feature-card.active {
          transform: translateY(-6px);
          border-color: rgba(190, 200, 255, 0.26);
          background:
            linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03)),
            rgba(12, 15, 24, 0.92);
          box-shadow:
            0 26px 70px rgba(0,0,0,0.34),
            0 0 0 1px rgba(255,255,255,0.03),
            inset 0 1px 0 rgba(255,255,255,0.07);
        }

        .feature-topline {
          position: relative;
          z-index: 2;
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.54);
          font-weight: 800;
          margin-bottom: 14px;
        }

        .feature-card h3 {
          position: relative;
          z-index: 2;
          margin: 0;
          font-size: 26px;
          line-height: 1.12;
          letter-spacing: -0.03em;
          font-weight: 800;
          color: #f8fbff;
          max-width: 18ch;
        }

        .feature-card p {
          position: relative;
          z-index: 2;
          margin: 16px 0 0;
          font-size: 16px;
          line-height: 1.75;
          color: rgba(235, 239, 247, 0.74);
          max-width: 62ch;
        }

        .feature-glow {
          position: absolute;
          inset: auto -80px -80px auto;
          width: 220px;
          height: 220px;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(118, 97, 255, 0.22), transparent 70%);
          filter: blur(12px);
          opacity: 0;
          transition: opacity 220ms ease;
          pointer-events: none;
        }

        .feature-card:hover .feature-glow,
        .feature-card.active .feature-glow {
          opacity: 1;
        }

        .system-panel {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          padding: 28px;
          border-radius: 28px;
          border: 1px solid rgba(255,255,255,0.08);
          background:
            linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02)),
            rgba(8, 10, 16, 0.88);
          box-shadow:
            0 22px 60px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.05);
        }

        .system-list {
          display: grid;
          gap: 16px;
        }

        .system-row {
          display: grid;
          grid-template-columns: 16px 1fr;
          gap: 14px;
          align-items: start;
          padding: 18px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.06);
          background:
            linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
          transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
        }

        .system-row:hover {
          transform: translateY(-3px);
          border-color: rgba(255,255,255,0.14);
          background:
            linear-gradient(180deg, rgba(255,255,255,0.085), rgba(255,255,255,0.03));
        }

        .system-dot {
          width: 10px;
          height: 10px;
          margin-top: 8px;
          border-radius: 999px;
          background: linear-gradient(135deg, #ffffff, #93a6ff);
          box-shadow: 0 0 18px rgba(147, 166, 255, 0.65);
        }

        .system-row strong {
          display: block;
          margin-bottom: 6px;
          font-size: 17px;
          color: #ffffff;
          font-weight: 800;
        }

        .system-row p {
          margin: 0;
          font-size: 15px;
          line-height: 1.7;
          color: rgba(235, 239, 247, 0.72);
        }

        .workflow-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .workflow-card {
          padding: 24px;
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.08);
          background:
            linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)),
            rgba(10, 12, 18, 0.85);
          box-shadow:
            0 18px 50px rgba(0,0,0,0.26),
            inset 0 1px 0 rgba(255,255,255,0.05);
          transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
        }

        .workflow-card:hover {
          transform: translateY(-5px);
          border-color: rgba(255,255,255,0.16);
          box-shadow:
            0 26px 70px rgba(0,0,0,0.34),
            inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .workflow-step {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 52px;
          height: 34px;
          padding: 0 12px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.82);
          font-weight: 800;
          letter-spacing: 0.12em;
          font-size: 11px;
          margin-bottom: 16px;
        }

        .workflow-card h3 {
          margin: 0;
          font-size: 24px;
          line-height: 1.12;
          letter-spacing: -0.03em;
          color: #ffffff;
          font-weight: 800;
        }

        .workflow-card p {
          margin: 14px 0 0;
          font-size: 15px;
          line-height: 1.75;
          color: rgba(235, 239, 247, 0.72);
        }

        .final-cta-shell {
          padding-top: 26px;
          padding-bottom: 56px;
        }

        .final-cta-panel {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 28px;
          border-radius: 30px;
          border: 1px solid rgba(255,255,255,0.08);
          background:
            radial-gradient(circle at 0% 0%, rgba(128, 93, 255, 0.14), transparent 32%),
            radial-gradient(circle at 100% 100%, rgba(92, 187, 255, 0.14), transparent 28%),
            linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)),
            rgba(8, 10, 16, 0.92);
          box-shadow:
            0 26px 80px rgba(0,0,0,0.34),
            inset 0 1px 0 rgba(255,255,255,0.05);
        }

        .final-title {
          margin: 0;
          font-size: clamp(30px, 4vw, 50px);
          line-height: 1.02;
          letter-spacing: -0.03em;
          color: #ffffff;
          font-weight: 800;
        }

        .final-text {
          margin: 16px 0 0;
          font-size: 17px;
          line-height: 1.75;
          color: rgba(235, 239, 247, 0.74);
          max-width: 780px;
        }

        .primary-cta.large {
          min-height: 58px;
          padding: 0 26px;
          white-space: nowrap;
        }

        @keyframes floatOrb {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-16px) scale(1.04);
          }
        }

        @media (max-width: 1180px) {
          .hero-panel,
          .system-panel,
          .final-cta-panel {
            grid-template-columns: 1fr;
            flex-direction: column;
            align-items: flex-start;
          }

          .hero-title {
            max-width: 13ch;
          }

          .hero-metrics,
          .feature-grid,
          .workflow-grid {
            grid-template-columns: 1fr;
          }

          .visual-frame {
            min-height: 460px;
          }
        }

        @media (max-width: 720px) {
          .hero-shell,
          .section-shell,
          .final-cta-shell {
            padding-left: 16px;
            padding-right: 16px;
          }

          .hero-panel,
          .system-panel,
          .final-cta-panel {
            padding: 20px;
            border-radius: 24px;
          }

          .hero-shell {
            padding-top: 20px;
          }

          .hero-title {
            font-size: 40px;
            max-width: none;
          }

          .hero-subtitle,
          .section-text,
          .final-text {
            font-size: 16px;
            line-height: 1.65;
          }

          .metric-card,
          .feature-card,
          .workflow-card,
          .system-row {
            border-radius: 18px;
          }

          .visual-frame {
            min-height: 400px;
            border-radius: 24px;
          }

          .stack-card strong {
            font-size: 18px;
          }

          .card-a,
          .card-b,
          .card-c,
          .card-d {
            margin-left: 0;
            max-width: 100%;
          }

          .primary-cta,
          .secondary-cta,
          .primary-cta.large {
            width: 100%;
          }

          .hero-actions,
          .final-actions {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}