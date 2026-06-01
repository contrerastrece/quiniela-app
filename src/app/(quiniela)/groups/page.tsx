import getUserSession from "@/lib/getUserSession";
import createSupabaseServerClient from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { HiOutlineUserGroup, HiOutlineLink, HiOutlinePlusCircle } from "react-icons/hi2";
import GroupCard from "./GroupCard";

export default async function GroupsPage() {
  const {
    data: { user },
  } = await getUserSession();
  if (!user) redirect("/login");

  const supabase = await createSupabaseServerClient();

  const { data: memberships } = await supabase
    .from("tbl_group_members")
    .select("group_id, role")
    .eq("user_id", user.id);

  let groups: any[] = [];
  const membershipRoles: Record<string, "admin" | "member"> = {};
  const pendingCounts: Record<string, number> = {};

  if (memberships?.length) {
    const groupIds = memberships.map((m) => m.group_id);
    memberships.forEach((m) => { membershipRoles[m.group_id] = m.role; });
    const { data } = await supabase
      .from("tbl_groups")
      .select("*")
      .in("id", groupIds)
      .order("created_at", { ascending: false });
    groups = data ?? [];

    const adminGroupIds = memberships
      .filter((m) => m.role === "admin")
      .map((m) => m.group_id);

    if (adminGroupIds.length > 0) {
      const { data: pendingReqs } = await supabase
        .from("tbl_group_join_requests")
        .select("group_id")
        .in("group_id", adminGroupIds)
        .eq("status", "pending");

      for (const req of pendingReqs ?? []) {
        pendingCounts[req.group_id] = (pendingCounts[req.group_id] || 0) + 1;
      }
    }
  }

  return (
    <div className="text-white px-4 py-6 max-w-5xl mx-auto">
      {groups.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 border border-slate-700">
            <HiOutlineUserGroup className="text-4xl text-slate-500" />
          </div>
          <h1 className="text-2xl font-bold text-teal-400 mb-2">
            Bienvenido a Quiniela-Contra
          </h1>
          <p className="text-slate-400 max-w-md mb-8 text-sm leading-relaxed">
            Para empezar, crea un grupo nuevo o únete a uno existente con un
            código de invitación.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/groups/new"
              className="bg-teal-600 hover:bg-teal-500 px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-teal-900/30"
            >
              <HiOutlinePlusCircle className="text-lg" />
              Crear grupo
            </Link>
            <Link
              href="/groups/join"
              className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <HiOutlineLink className="text-lg" />
              Unirse con código
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-teal-400">Mis grupos</h1>
              <p className="text-sm text-slate-400 mt-0.5">
                {groups.length} {groups.length === 1 ? "grupo" : "grupos"}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/groups/join"
                className="bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5"
              >
                <HiOutlineLink className="text-sm" />
                Unirse
              </Link>
              <Link
                href="/groups/new"
                className="bg-teal-600 hover:bg-teal-500 px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5"
              >
                <HiOutlinePlusCircle className="text-sm" />
                Nuevo
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {groups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                isAdmin={membershipRoles[group.id] === "admin"}
                pendingCount={pendingCounts[group.id] || 0}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
