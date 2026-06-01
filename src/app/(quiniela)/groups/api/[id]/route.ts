import createSupabaseServerClient from "@/lib/supabase/server";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { data: group } = await supabase
    .from("tbl_groups")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!group) return Response.json({ error: "Not found" }, { status: 404 });

  const { data: members } = await supabase
    .from("tbl_group_members")
    .select("user_id, role, joined_at")
    .eq("group_id", params.id);

  const userIds = (members ?? []).map((m: any) => m.user_id);
  const { data: users } = await supabase
    .from("tbl_users")
    .select("id, name, url_image")
    .in("id", userIds);

  const membersWithUsers = (members ?? []).map((m: any) => ({
    ...m,
    user: (users ?? []).find((u: any) => u.id === m.user_id) || {
      id: m.user_id,
      name: "Unknown",
      url_image: "",
    },
  }));

  const { data: rankings } = await supabase.rpc("get_group_rankings", {
    group_id_param: params.id,
  });

  return Response.json({ ...group, members: membersWithUsers, rankings });
}
