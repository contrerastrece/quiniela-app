export async function GET(request: Request) {
  const res = await fetch(`https://api.football-data.org/v4/competitions`, {
    next: { revalidate: 0 },
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": process.env.API_TOKEN!,
    },
  });
  const data = await res.json();

  return Response.json(data);
}

