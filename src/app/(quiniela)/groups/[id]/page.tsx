import createSupabaseServerClient from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import GroupWorkspace from "./GroupWorkspace";

export default async function GroupDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: group } = await supabase
    .from("tbl_groups")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!group) redirect("/groups");

  const { data: membership } = await supabase
    .from("tbl_group_members")
    .select()
    .eq("group_id", params.id)
    .eq("user_id", user.id)
    .single();

  if (!membership) redirect("/groups");

  const { data: members } = await supabase
    .from("tbl_group_members")
    .select("user_id, role, joined_at")
    .eq("group_id", params.id);

  const userIds = (members ?? []).map((m) => m.user_id);
  const { data: users } = await supabase
    .from("tbl_users")
    .select("id, name, url_image")
    .in("id", userIds);

  const membersWithUsers = (members ?? []).map((m) => ({
    ...m,
    user: (users ?? []).find((u) => u.id === m.user_id) || {
      id: m.user_id,
      name: "Unknown",
      url_image: "",
    },
  }));

  const { data: rankings } = await supabase.rpc("get_group_rankings", {
    group_id_param: params.id,
  });

  return (
    <GroupWorkspace
      group={group}
      members={membersWithUsers}
      rankings={rankings ?? []}
      isAdmin={membership.role === "admin"}
      currentUserId={user.id}
    />
  );
}
