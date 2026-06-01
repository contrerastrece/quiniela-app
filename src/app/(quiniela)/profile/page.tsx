import getUserSession from "@/lib/getUserSession";
import createSupabaseServerClient from "@/lib/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { BtnLogOut } from "@/components/ui/buttons/BtnLogOut";
import Link from "next/link";

export default async function ProfilePage() {
  const {
    data: { user },
  } = await getUserSession();

  if (!user) {
    return redirect("/login");
  }

  const supabase = await createSupabaseServerClient();
  const { data: memberships } = await supabase
    .from("tbl_group_members")
    .select("group_id")
    .eq("user_id", user.id);

  let groups: { id: string; name: string; competition_name: string | null }[] = [];
  if (memberships?.length) {
    const { data } = await supabase
      .from("tbl_groups")
      .select("id, name, competition_name")
      .in("id", memberships.map((m) => m.group_id));
    groups = data ?? [];
  }

  const name = user.user_metadata?.name ?? "Usuario";
  const email = user.user_metadata?.email ?? "";
  const picture = user.user_metadata?.picture ?? "";

  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        {/* Avatar + Name */}
        <div className="flex flex-col items-center text-center mb-6">
          <Image
            src={picture}
            alt={name}
            width={80}
            height={80}
            className="rounded-full border-2 border-teal-400/50 mb-3"
          />
          <h1 className="text-xl font-bold text-white">{name}</h1>
          <p className="text-sm text-slate-400">{email}</p>
        </div>

        {/* Groups */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block" />
            Mis grupos ({groups.length})
          </h2>
          {groups.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-3">
              No perteneces a ningún grupo.
            </p>
          ) : (
            <ul className="space-y-1.5">
              {groups.map((g) => (
                <li key={g.id}>
                  <Link
                    href={`/groups/${g.id}`}
                    className="flex items-center justify-between bg-slate-700/50 hover:bg-slate-700 rounded-lg px-3 py-2 text-sm transition-colors"
                  >
                    <span className="text-white truncate">{g.name}</span>
                    {g.competition_name && (
                      <span className="text-[10px] text-teal-300 bg-teal-900/30 px-1.5 py-0.5 rounded-full ml-2 whitespace-nowrap">
                        {g.competition_name}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Logout */}
        <div className="pt-4 border-t border-slate-700">
          <BtnLogOut />
        </div>
      </div>
    </div>
  );
}
