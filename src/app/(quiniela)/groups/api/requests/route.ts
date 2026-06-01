import createSupabaseServerClient from "@/lib/supabase/server";
import { NextRequest } from "next/server";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { data: adminGroups } = await supabase
    .from("tbl_group_members")
    .select("group_id")
    .eq("user_id", user.id)
    .eq("role", "admin");

  if (!adminGroups || adminGroups.length === 0) {
    return Response.json([]);
  }

  const groupIds = adminGroups.map((g: any) => g.group_id);

  const { data: groups } = await supabase
    .from("tbl_groups")
    .select("id, name")
    .in("id", groupIds);

  const groupsMap = new Map((groups ?? []).map((g: any) => [g.id, g.name]));

  const { data: requests } = await supabase
    .from("tbl_group_join_requests")
    .select("id, group_id, user_id, status, created_at")
    .in("group_id", groupIds)
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  const userIds = Array.from(new Set((requests ?? []).map((r: any) => r.user_id)));
  const { data: users } = await supabase
    .from("tbl_users")
    .select("id, name, url_image")
    .in("id", userIds);

  const usersMap = new Map((users ?? []).map((u: any) => [u.id, u]));

  const requestsWithDetails = (requests ?? []).map((r: any) => ({
    ...r,
    group_name: groupsMap.get(r.group_id) || "Unknown",
    user: usersMap.get(r.user_id) || { id: r.user_id, name: "Unknown", url_image: "" },
  }));

  return Response.json(requestsWithDetails);
}
