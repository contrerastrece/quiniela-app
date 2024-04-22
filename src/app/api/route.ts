// export async function GET() {
//   const res = await fetch('https://api.football-data.org/v4/matches?dateFrom=2024-04-21&dateTo=2024-04-22', {
//     headers: {
//       'Content-Type': 'application/json',
//       'API-Key': process.env.API_TOKEN,
//     },
//   })
//   const data = await res.json()

//   return Response.json({ data })
// }
export async function GET(request: Request) {
  const res = await fetch(
    `https://api.football-data.org/v4/matches`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": process.env.API_TOKEN!,
      },
    }
  );
  const data = await res.json();

  return Response.json(data.matches );
}
