// app/video/page.js
import { redirect } from "next/navigation"
import { createClient } from "../../lib/supabase/server"
import VideoPage from "./page.client"

export const dynamic = "force-dynamic"

export default async function Page() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

const { data: profile } = await supabase
  .from("profiles")
  .select("membership_video, is_admin, has_access")
  .eq("id", user.id)
  .single()

if (!(profile?.is_admin || profile?.has_access || profile?.membership_video)) {
  redirect("/pricing?app=video")
}

  return <VideoPage />
}