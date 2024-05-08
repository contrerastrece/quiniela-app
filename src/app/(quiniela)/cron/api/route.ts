import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export async function GET(request: Request) {
  // obtener el partido de hoy
  const res = await fetch(`https://api.football-data.org/v4/matches`, {
    next: { revalidate: 30 },
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": process.env.API_TOKEN!,
    },
  });
  const matches = await res.json();

  // obtener las predicciones del usuario
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("tbl_predictions")
    .select()
    .eq("status_match", 'TIMED');
  // console.log(data?.length);
  // asegurarse de que matches sea un array
  const matchesArray = Array.isArray(matches)
    ? matches
    : Object.values(matches);

  // filtrar
  // console.log(matchesArray)
  // acceder al array interno dentro de matchesArray
  const nestedMatches = matchesArray.find((item) => Array.isArray(item));
  // console.log(nestedMatches.length);

  const filteredMatches = nestedMatches.filter(
    (objeto: any) =>
      objeto.status === "FINISHED" &&
      data?.some((prediction: any) => prediction.id_match === objeto.id)
  );
  // console.log(filteredMatches[0].id);

  // Actualizar los registros que cumplen con la condición
  const updates = filteredMatches.map(async (objeFilter: any) => {
    const { data: update, error: errorUpdate } = await supabase
      .from("tbl_predictions")
      .update({
        status_match: objeFilter.status,
        result_home: objeFilter.score.fullTime.home,
        result_visit: objeFilter.score.fullTime.away,
      })
      .eq("id_match", objeFilter.id);

    if (errorUpdate) {
      console.error("Error al actualizar: ", errorUpdate);
    }
    // Esperar a que todas las actualizaciones se completen
    await Promise.all(updates);

    return update;
  });

  return Response.json(filteredMatches);
}
