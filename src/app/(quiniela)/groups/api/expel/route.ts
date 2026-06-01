import createSupabaseServerClient from "@/lib/supabase/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { group_id, user_id }: { group_id: string; user_id: string } = await request.json();
  if (!group_id || !user_id) return Response.json({ error: "group_id and user_id required" }, { status: 400 });

  const { data: requester } = await supabase
    .from("tbl_group_members")
    .select("role")
    .eq("group_id", group_id)
    .eq("user_id", user.id)
    .single();

  if (!requester || requester.role !== "admin")
    return Response.json({ error: "Only admins can expel members" }, { status: 403 });

  const { error } = await supabase
    .from("tbl_group_members")
    .delete()
    .eq("group_id", group_id)
    .eq("user_id", user_id);

  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ success: true });
}
