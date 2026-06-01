import createSupabaseServerClient from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json([], { status: 401 });

  const { data: memberships } = await supabase
    .from("tbl_group_members")
    .select("group_id")
    .eq("user_id", user.id);

  if (!memberships?.length) return Response.json([]);

  const groupIds = memberships.map((m) => m.group_id);

  const { data: groups } = await supabase
    .from("tbl_groups")
    .select("*")
    .in("id", groupIds)
    .order("created_at", { ascending: false });

  return Response.json(groups ?? []);
}

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { name, description, competition_id, competition_name } = await request.json();

  if (!name?.trim()) {
    return Response.json({ error: "Name is required" }, { status: 400 });
  }

  const invite_code = crypto.randomUUID().split("-").join("").slice(0, 8).toUpperCase();

  const { data: group, error } = await supabase
    .from("tbl_groups")
    .insert({
      name: name.trim(),
      description: description?.trim() || null,
      created_by: user.id,
      invite_code,
      competition_id: competition_id || null,
      competition_name: competition_name || null,
    })
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });

  const { error: memberError } = await supabase.from("tbl_group_members").insert({
    group_id: group.id,
    user_id: user.id,
    role: "admin",
  });

  if (memberError) {
    await supabase.from("tbl_groups").delete().eq("id", group.id);
    return Response.json({ error: memberError.message }, { status: 500 });
  }

  return Response.json(group, { status: 201 });
}
