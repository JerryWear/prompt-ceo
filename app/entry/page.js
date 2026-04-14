"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

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

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-background text-foreground"
      style={{
        background: `
          radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(120, 80, 200, 0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 20% 0%, rgba(120, 80, 200, 0.12) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 100%, rgba(80, 60, 160, 0.08) 0%, transparent 50%)
        `,
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl animate-pulse" />
      <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-accent/5 blur-3xl animate-pulse delay-1000" />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-4 pt-20 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-4 py-2 backdrop-blur-sm animate-fade-in">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm text-muted-foreground">
              Prompt CEO Access Portal
            </span>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up">
            <span className="bg-gradient-to-b from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent text-balance">
              Choose Your Prompt CEO Engine
            </span>
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground sm:text-xl text-pretty animate-fade-in-up delay-100">
            Enter the system through photo prompts, cinematic video workflows,
            or unlock both together for the full Prompt CEO experience.
          </p>

          <div className="grid w-full gap-6 md:grid-cols-3 animate-fade-in-up delay-200">
            <section className="flex min-h-[320px] flex-col rounded-2xl border border-border/50 bg-card/60 p-6 text-left backdrop-blur-xl">
              <div className="mb-6">
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  App One
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                  Photo
                </h2>
              </div>

              <p className="mb-6 text-sm leading-7 text-muted-foreground sm:text-base">
                Generate premium photo prompts for creators, influencers, and
                brands who need identity-consistent visual content with a luxury
                cinematic feel.
              </p>

              <div className="mt-auto">
                <Button
                  size="lg"
                  className="group w-full bg-foreground text-background hover:bg-foreground/90"
                  asChild
                >
                  <Link
                    href="/photo"
                    className="flex items-center justify-center gap-2"
                  >
                    Enter Photo
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </div>
            </section>

            <section className="flex min-h-[320px] flex-col rounded-2xl border border-border/50 bg-card/60 p-6 text-left backdrop-blur-xl">
              <div className="mb-6">
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  App Two
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                  Video
                </h2>
              </div>

              <p className="mb-6 text-sm leading-7 text-muted-foreground sm:text-base">
                Build cinematic video prompt flows for short-form storytelling,
                motion-first content, stronger hooks, and visual sequences that
                feel premium from start to finish.
              </p>

              <div className="mt-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-border hover:bg-secondary/50"
                  asChild
                >
                  <Link href="/video">Enter Video</Link>
                </Button>
              </div>
            </section>

            <section className="flex min-h-[320px] flex-col rounded-2xl border border-accent/30 bg-card/60 p-6 text-left backdrop-blur-xl">
              <div className="mb-6">
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-accent">
                  Best Value
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                  Bundle
                </h2>
              </div>

              <p className="mb-6 text-sm leading-7 text-muted-foreground sm:text-base">
                Unlock the complete Prompt CEO system with both engines together
                for maximum creative flexibility, faster output, and full
                control across photo and video creation.
              </p>

              <div className="mt-auto">
                <Button
                  size="lg"
                  className="group w-full bg-foreground text-background hover:bg-foreground/90"
                  asChild
                >
                  <Link
                    href="/bundle"
                    className="flex items-center justify-center gap-2"
                  >
                    Get the Bundle
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </div>
            </section>
          </div>

          <div className="mt-16 grid w-full max-w-4xl grid-cols-3 gap-8 border-t border-border/30 pt-10 animate-fade-in-up delay-300">
            <div>
              <div className="text-2xl font-bold text-foreground sm:text-3xl">
                Photo
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                Identity-stable prompt creation
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground sm:text-3xl">
                Video
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                Cinematic motion workflows
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground sm:text-3xl">
                Bundle
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                Full Prompt CEO access
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}