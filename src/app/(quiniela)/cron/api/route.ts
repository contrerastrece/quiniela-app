import createSupabaseServerClient from "@/lib/supabase/server";

export async function GET(request: Request) {
  const supabase = await createSupabaseServerClient();

  const { data: predictions } = await supabase
    .from("tbl_predictions")
    .select()
    .eq("status_match", "TIMED");

  if (!predictions?.length) {
    return Response.json([]);
  }

  const today = new Date();
  const dateTo = today.toISOString().split("T")[0];
  const past = new Date(today);
  past.setDate(past.getDate() - 10);
  const dateFrom = past.toISOString().split("T")[0];

  const res = await fetch(
    `https://api.football-data.org/v4/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": process.env.API_TOKEN!,
      },
    }
  );
  const { matches } = await res.json();

  const finished = matches.filter(
    (match: any) =>
      match.status === "FINISHED" &&
      predictions.some((p: any) => p.id_match === match.id)
  );

  const updates = finished.map(async (match: any) => {
    const { error } = await supabase
      .from("tbl_predictions")
      .update({
        status_match: match.status,
        result_home: match.score.fullTime.home,
        result_visit: match.score.fullTime.away,
      })
      .eq("id_match", match.id);

    if (error) {
      console.error("Error al actualizar: ", error);
    }
  });

  await Promise.all(updates);

  return Response.json(finished);
}
