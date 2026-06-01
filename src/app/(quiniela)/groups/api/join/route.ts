import createSupabaseServerClient from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { invite_code, password } = await request.json();

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

  if (group.password && password !== group.password) {
    return Response.json({ error: "Contraseña incorrecta" }, { status: 403 });
  }

  const { data: existing } = await supabase
    .from("tbl_group_members")
    .select()
    .eq("group_id", group.id)
    .eq("user_id", user.id);

  if (existing?.length) {
    const { password: _, ...safeGroup } = group;
    return Response.json(safeGroup);
  }

  await supabase.from("tbl_group_members").insert({
    group_id: group.id,
    user_id: user.id,
    role: "member",
  });

  const { password: _, ...safeGroup } = group;
  return Response.json(safeGroup, { status: 201 });
}
