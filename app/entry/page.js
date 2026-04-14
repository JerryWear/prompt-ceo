"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

export default function EntryPage() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      container.style.setProperty("--mouse-x", `${x}px`)
      container.style.setProperty("--mouse-y", `${y}px`)
    }

    container.addEventListener("mousemove", handleMouseMove)
    return () => container.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const pageStyle = {
    minHeight: "100vh",
    color: "#f5f7fb",
    background: `
      radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(120, 80, 200, 0.10) 0%, transparent 28%),
      radial-gradient(ellipse at top left, rgba(120, 80, 200, 0.18) 0%, transparent 42%),
      radial-gradient(ellipse at bottom right, rgba(60, 80, 180, 0.14) 0%, transparent 40%),
      linear-gradient(180deg, #06070b 0%, #090b12 50%, #05060a 100%)
    `,
    position: "relative",
    overflow: "hidden",
    fontFamily: "Arial, Helvetica, sans-serif",
  }

  const gridOverlay = {
    position: "absolute",
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
    `,
    backgroundSize: "64px 64px",
    maskImage: "radial-gradient(ellipse at center, black 22%, transparent 72%)",
    WebkitMaskImage:
      "radial-gradient(ellipse at center, black 22%, transparent 72%)",
    pointerEvents: "none",
  }

  const orbOne = {
    position: "absolute",
    top: "12%",
    left: "14%",
    width: "420px",
    height: "420px",
    borderRadius: "9999px",
    background: "rgba(120, 80, 200, 0.14)",
    filter: "blur(110px)",
    pointerEvents: "none",
  }

  const orbTwo = {
    position: "absolute",
    right: "10%",
    bottom: "14%",
    width: "300px",
    height: "300px",
    borderRadius: "9999px",
    background: "rgba(70, 90, 190, 0.10)",
    filter: "blur(100px)",
    pointerEvents: "none",
  }

  const wrapperStyle = {
    position: "relative",
    zIndex: 1,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "96px 24px 48px",
  }

  const innerStyle = {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    textAlign: "center",
  }

  const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 16px",
    borderRadius: "9999px",
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    marginBottom: "28px",
  }

  const badgeDotStyle = {
    width: "8px",
    height: "8px",
    borderRadius: "9999px",
    background: "#8b6cff",
    boxShadow: "0 0 14px rgba(139,108,255,0.75)",
  }

  const badgeTextStyle = {
    fontSize: "13px",
    color: "rgba(255,255,255,0.72)",
    letterSpacing: "0.04em",
  }

  const headingStyle = {
    margin: "0 0 18px",
    fontSize: "clamp(44px, 7vw, 86px)",
    lineHeight: 0.95,
    fontWeight: 700,
    letterSpacing: "-0.05em",
    color: "#f7f8fb",
  }

  const subheadingStyle = {
    maxWidth: "840px",
    margin: "0 auto 42px",
    fontSize: "clamp(18px, 2.2vw, 26px)",
    lineHeight: 1.5,
    color: "rgba(255,255,255,0.76)",
  }

  const cardsStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "22px",
    marginTop: "12px",
  }

  const cardBaseStyle = {
    borderRadius: "28px",
    border: "1px solid rgba(255,255,255,0.10)",
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.02))",
    boxShadow:
      "0 18px 60px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.04)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    padding: "28px",
    minHeight: "340px",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  }

  const overlineStyle = {
    fontSize: "12px",
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.58)",
    margin: "0 0 14px",
  }

  const bundleOverlineStyle = {
    ...overlineStyle,
    color: "#9f8cff",
  }

  const cardTitleStyle = {
    margin: "0 0 18px",
    fontSize: "clamp(34px, 4vw, 48px)",
    lineHeight: 1,
    fontWeight: 700,
    letterSpacing: "-0.04em",
    color: "#ffffff",
  }

  const cardTextStyle = {
    margin: "0 0 28px",
    fontSize: "17px",
    lineHeight: 1.65,
    color: "rgba(255,255,255,0.76)",
  }

  const primaryButtonStyle = {
    marginTop: "auto",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "56px",
    width: "100%",
    borderRadius: "16px",
    background: "#f5f7fb",
    color: "#08090d",
    fontWeight: 700,
    fontSize: "16px",
    textDecoration: "none",
    boxShadow: "0 10px 26px rgba(255,255,255,0.10)",
  }

  const secondaryButtonStyle = {
    ...primaryButtonStyle,
    background: "rgba(255,255,255,0.04)",
    color: "#f5f7fb",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "none",
  }

  const statsStyle = {
    marginTop: "46px",
    paddingTop: "28px",
    borderTop: "1px solid rgba(255,255,255,0.10)",
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "20px",
  }

  const statTitleStyle = {
    fontSize: "clamp(24px, 3vw, 34px)",
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: "6px",
  }

  const statTextStyle = {
    fontSize: "14px",
    color: "rgba(255,255,255,0.62)",
    lineHeight: 1.4,
  }

  return (
    <main ref={containerRef} style={pageStyle}>
      <div style={gridOverlay} />
      <div style={orbOne} />
      <div style={orbTwo} />

      <section style={wrapperStyle}>
        <div style={innerStyle}>
          <div style={badgeStyle}>
            <span style={badgeDotStyle} />
            <span style={badgeTextStyle}>Prompt CEO Access Portal</span>
          </div>

          <h1 style={headingStyle}>Choose Your Prompt CEO Engine</h1>

          <p style={subheadingStyle}>
            Enter the system through photo prompts, cinematic video workflows,
            or unlock both together for the full Prompt CEO experience.
          </p>

          <div style={cardsStyle}>
            <section style={cardBaseStyle}>
              <p style={overlineStyle}>App One</p>
              <h2 style={cardTitleStyle}>Photo</h2>
              <p style={cardTextStyle}>
                Generate premium photo prompts for creators, influencers, and
                brands who need identity-consistent visual content with a luxury
                cinematic feel.
              </p>

              <Link href="/photo" style={primaryButtonStyle}>
                Enter Photo →
              </Link>
            </section>

            <section style={cardBaseStyle}>
              <p style={overlineStyle}>App Two</p>
              <h2 style={cardTitleStyle}>Video</h2>
              <p style={cardTextStyle}>
                Build cinematic video prompt flows for short-form storytelling,
                motion-first content, stronger hooks, and visual sequences that
                feel premium from start to finish.
              </p>

              <Link href="/video" style={secondaryButtonStyle}>
                Enter Video
              </Link>
            </section>

            <section
              style={{
                ...cardBaseStyle,
                border: "1px solid rgba(159,140,255,0.28)",
              }}
            >
              <p style={bundleOverlineStyle}>Best Value</p>
              <h2 style={cardTitleStyle}>Bundle</h2>
              <p style={cardTextStyle}>
                Unlock the complete Prompt CEO system with both engines together
                for maximum creative flexibility, faster output, and full
                control across photo and video creation.
              </p>

              <Link href="/bundle" style={primaryButtonStyle}>
                Get the Bundle →
              </Link>
            </section>
          </div>

          <div style={statsStyle}>
            <div>
              <div style={statTitleStyle}>Photo</div>
              <div style={statTextStyle}>Identity-stable prompt creation</div>
            </div>

            <div>
              <div style={statTitleStyle}>Video</div>
              <div style={statTextStyle}>Cinematic motion workflows</div>
            </div>

            <div>
              <div style={statTitleStyle}>Bundle</div>
              <div style={statTextStyle}>Full Prompt CEO access</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}