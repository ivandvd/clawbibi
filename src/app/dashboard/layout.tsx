import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardShell } from "./DashboardShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch profile from DB for richer data
  const { data: profile } = await supabase
    .from("profiles")
    .select("name, locale, plan")
    .eq("id", user.id)
    .single();

  const userName = profile?.name || user.user_metadata?.full_name || user.user_metadata?.name;

  return (
    <DashboardShell
      userName={userName}
      userEmail={user.email}
      userAvatar={user.user_metadata?.avatar_url}
    >
      {children}
    </DashboardShell>
  );
}
