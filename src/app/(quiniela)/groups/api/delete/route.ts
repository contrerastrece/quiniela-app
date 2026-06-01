import createSupabaseServerClient from "@/lib/supabase/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { group_id }: { group_id: string } = await request.json();
  if (!group_id) return Response.json({ error: "group_id required" }, { status: 400 });

  const { data: group } = await supabase
    .from("tbl_groups")
    .select("created_by")
    .eq("id", group_id)
    .single();

  if (!group) return Response.json({ error: "Group not found" }, { status: 404 });
  if (group.created_by !== user.id) return Response.json({ error: "Only the creator can delete the group" }, { status: 403 });

  const { error } = await supabase.from("tbl_groups").delete().eq("id", group_id);
  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ success: true });
}
