"use client"

import Link from "next/link"

export default function PhotoPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#05060a",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, Helvetica, sans-serif",
        textAlign: "center",
        padding: "40px",
      }}
    >
      <div style={{ maxWidth: "700px" }}>
        <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
          Photo Engine
        </h1>

        <p style={{ opacity: 0.7, marginBottom: "30px" }}>
          This is where users will enter the Photo Prompt system.
        </p>

        <Link
          href="/prompt-v2"
          style={{
            display: "inline-block",
            padding: "16px 28px",
            borderRadius: "12px",
            background: "#ffffff",
            color: "#000",
            fontWeight: "600",
            textDecoration: "none",
          }}
        >
          Open Photo App →
        </Link>

        <div style={{ marginTop: "30px" }}>
          <Link href="/entry" style={{ opacity: 0.6 }}>
            ← Back
          </Link>
        </div>
      </div>
    </main>
  )
}