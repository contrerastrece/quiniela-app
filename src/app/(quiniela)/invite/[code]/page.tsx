import getUserSession from "@/lib/getUserSession";
import createSupabaseServerClient from "@/lib/supabase/server";
import InviteClient from "./InviteClient";

export default async function InvitePage({
  params,
}: {
  params: { code: string };
}) {
  const {
    data: { user },
  } = await getUserSession();

  const supabase = await createSupabaseServerClient();

  const { data: group } = await supabase
    .from("tbl_groups")
    .select("id, name, description, invite_code, competition_id, competition_name, password")
    .eq("invite_code", params.code.toUpperCase())
    .single();

  if (!group) {
    return (
      <div className="text-white px-4 py-16 text-center">
        <p className="text-xl text-slate-400">
          Código de invitación inválido o grupo no encontrado.
        </p>
      </div>
    );
  }

  const { count: memberCount } = await supabase
    .from("tbl_group_members")
    .select("*", { count: "exact", head: true })
    .eq("group_id", group.id);

  let alreadyMember = false;
  if (user) {
    const { data: membership } = await supabase
      .from("tbl_group_members")
      .select()
      .eq("group_id", group.id)
      .eq("user_id", user.id)
      .single();
    alreadyMember = !!membership;
  }

  const hasPassword = !!group.password;
  const { password: _, ...safeGroup } = group;

  return (
    <InviteClient
      group={safeGroup}
      memberCount={memberCount ?? 0}
      alreadyMember={alreadyMember}
      hasPassword={hasPassword}
      isAuthenticated={!!user}
    />
  );
}
