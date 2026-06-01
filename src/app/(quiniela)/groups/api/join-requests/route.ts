import createSupabaseServerClient from "@/lib/supabase/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const group_id = searchParams.get("group_id");
  if (!group_id) return Response.json({ error: "group_id required" }, { status: 400 });

  const { data: requester } = await supabase
    .from("tbl_group_members")
    .select("role")
    .eq("group_id", group_id)
    .eq("user_id", user.id)
    .single();

  if (!requester || requester.role !== "admin")
    return Response.json({ error: "Only admins can view pending requests" }, { status: 403 });

  const { data: requests } = await supabase
    .from("tbl_group_join_requests")
    .select("id, user_id, status, created_at")
    .eq("group_id", group_id)
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  const userIds = (requests ?? []).map((r: any) => r.user_id);
  const { data: users } = await supabase
    .from("tbl_users")
    .select("id, name, url_image")
    .in("id", userIds);

  const requestsWithUsers = (requests ?? []).map((r: any) => ({
    ...r,
    user: (users ?? []).find((u: any) => u.id === r.user_id) || { id: r.user_id, name: "Unknown", url_image: "" },
  }));

  return Response.json(requestsWithUsers);
}
