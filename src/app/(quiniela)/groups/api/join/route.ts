import createSupabaseServerClient from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { invite_code } = await request.json();

  if (!invite_code?.trim()) {
    return Response.json({ error: "Invite code is required" }, { status: 400 });
  }

  const { data: group } = await supabase
    .from("tbl_groups")
    .select("*")
    .eq("invite_code", invite_code.trim().toUpperCase())
    .single();

  if (!group) {
    return Response.json({ error: "Invalid invite code" }, { status: 404 });
  }

  const { data: existing } = await supabase
    .from("tbl_group_members")
    .select()
    .eq("group_id", group.id)
    .eq("user_id", user.id);

  if (existing?.length) {
    return Response.json(group);
  }

  await supabase.from("tbl_group_members").insert({
    group_id: group.id,
    user_id: user.id,
    role: "member",
  });

  return Response.json(group, { status: 201 });
}
