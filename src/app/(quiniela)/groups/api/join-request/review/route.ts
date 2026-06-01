import createSupabaseServerClient from "@/lib/supabase/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { request_id, action }: { request_id: string; action: "approve" | "reject" } = await request.json();
  if (!request_id || !action) return Response.json({ error: "request_id and action required" }, { status: 400 });

  const { data: req } = await supabase
    .from("tbl_group_join_requests")
    .select("group_id, user_id, status")
    .eq("id", request_id)
    .single();

  if (!req) return Response.json({ error: "Request not found" }, { status: 404 });
  if (req.status !== "pending") return Response.json({ error: "Request already processed" }, { status: 400 });

  const { data: requester } = await supabase
    .from("tbl_group_members")
    .select("role")
    .eq("group_id", req.group_id)
    .eq("user_id", user.id)
    .single();

  if (!requester || requester.role !== "admin")
    return Response.json({ error: "Only admins can manage requests" }, { status: 403 });

  await supabase
    .from("tbl_group_join_requests")
    .update({ status: action === "approve" ? "approved" : "rejected" })
    .eq("id", request_id);

  if (action === "approve") {
    await supabase.from("tbl_group_members").upsert({
      group_id: req.group_id,
      user_id: req.user_id,
      role: "member",
    }, { onConflict: "group_id, user_id" });
  }

  return Response.json({ success: true });
}
