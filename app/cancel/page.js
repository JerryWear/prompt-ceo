"use client";

import Link from "next/link";

export default function CancelPage() {
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
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 720 }}>
        <h1 style={{ fontSize: 44, marginBottom: 10 }}>⚠️ Checkout Canceled</h1>
        <p style={{ fontSize: 16, opacity: 0.85 }}>
          No worries — you can try again anytime.
        </p>

        <div style={{ marginTop: 18 }}>
          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "12px 18px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.08)",
              color: "white",
              textDecoration: "none",
              fontSize: 16,
            }}
          >
            Back to Home →
          </Link>
        </div>
      </div>
    </main>
  );
}