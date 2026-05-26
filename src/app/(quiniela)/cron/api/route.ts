import createSupabaseServerClient from "@/lib/supabase/server";

export async function GET(request: Request) {
  const res = await fetch(`https://api.football-data.org/v4/matches`, {
    next: { revalidate: 30 },
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": process.env.API_TOKEN!,
    },
  });
  const { matches } = await res.json();

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("tbl_predictions")
    .select()
    .eq("status_match", "TIMED");

  const filteredMatches = matches.filter(
    (match: any) =>
      match.status === "FINISHED" &&
      data?.some((prediction: any) => prediction.id_match === match.id)
  );

  const updates = filteredMatches.map(async (match: any) => {
    const { error: errorUpdate } = await supabase
      .from("tbl_predictions")
      .update({
        status_match: match.status,
        result_home: match.score.fullTime.home,
        result_visit: match.score.fullTime.away,
      })
      .eq("id_match", match.id);

    if (errorUpdate) {
      console.error("Error al actualizar: ", errorUpdate);
    }
  });

  await Promise.all(updates);

  return Response.json(filteredMatches);
}
