import createSupabaseServerClient from "@/lib/supabase/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { group_id }: { group_id: string } = await request.json();
  if (!group_id) return Response.json({ error: "group_id required" }, { status: 400 });

  const { error } = await supabase.from("tbl_group_join_requests").insert({
    group_id,
    user_id: user.id,
    status: "pending",
  });

  if (error) {
    if (error.code === "23505") {
      return Response.json({ error: "Ya solicitaste unirte a este grupo" }, { status: 409 });
    }
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ success: true });
}
