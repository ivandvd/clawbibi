import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

// DELETE /api/profile/delete — delete the authenticated user's account
export async function DELETE() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Cascade delete agents (and their related data) from user
  await supabase.from("agents").delete().eq("user_id", user.id);
  await supabase.from("profiles").delete().eq("id", user.id);

  // Use admin client to delete the auth user (requires SERVICE_ROLE_KEY)
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (serviceKey && supabaseUrl) {
    const admin = createAdminClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    await admin.auth.admin.deleteUser(user.id);
  }

  return NextResponse.json({ ok: true });
}
