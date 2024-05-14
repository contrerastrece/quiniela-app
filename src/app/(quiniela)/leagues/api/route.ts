import moment from "moment";

export async function GET(request: Request) {
  const day=moment().format("YYYY-MM-DD")
  const nextDay = moment(day).add(1, "days").format("YYYY-MM-DD");
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const res = await fetch(`https://api.football-data.org/v4/competitions/${id}/matches?dateFrom=${day}&dateTo=${nextDay}`, {
    next: { revalidate: 0 },
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": process.env.API_TOKEN!,
    },
  });
  const data = await res.json();

  return Response.json(data);
}

