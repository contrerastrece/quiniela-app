import { Match, apiOptions } from "@/types";
import moment from "moment";

const options: apiOptions = {
  next: { revalidate: 30 },
  headers: {
    "X-Auth-Token": process.env.API_TOKEN,
    "Content-Type": "application/json",
  },
};
// obtener Partidos de las 13 competiciones (free plan)

export const getMatchesfootballByWeek = async () => {
  const firstDay = moment().subtract(3, "days").format("YYYY-MM-DD");
  const lastDay = moment().add(4, "days").format("YYYY-MM-DD");
  console.log(firstDay);
  try {
    const matchData = await fetch(
      `https://api.football-data.org/v4/matches?dateFrom=${firstDay}&dateTo=${lastDay}`,
      options
    );
    const data = await matchData.json();
    return data;
  } catch (error) {
    console.log(error, "🚩");
  }
};

export const getMatchesbyDate = async (date: string) => {
  // convertir el día
  // const selectDay=moment(date)
  const nextDay = moment(date).add(1, "days").format("YYYY-MM-DD");
  //
  try {
    const matchData = await fetch(
      `https://api.football-data.org/v4/matches?dateFrom=${date}&dateTo=${nextDay}`,
      options
    );
    const data = await matchData.json();
    return data;
  } catch (error) {
    console.error(error, "🚩");
  }
};

export const getMatches = async (day: string) => {
  const nextDay = moment(day).add(2, "days").format("YYYY-MM-DD");
  try {
    let url = `http://localhost:3000/api?dateFrom=${day}&dateTo=${nextDay}`;
    const response = await fetch(url);
    const data = await response.json();
    const grouped = groupMatchesByDate(data);
    console.log(grouped);

    return grouped;
  } catch (error) {
    console.error(error, "🚩");
  }
};

export const groupByCompetitions = () => {
  // obtener matchesByDate
  // agrupar y retornar por Competición
};

export const groupMatchesByDate = (matches: Match[]) => {
  const groupedMatches: Record<string, Match[]> = {};

  matches.forEach((match) => {
    const date = moment(match.utcDate).format("YYYY-MM-DD");

    if (!groupedMatches[date]) {
      groupedMatches[date] = [];
    }

    groupedMatches[date].push(match);
  });

  return groupedMatches;
};

export const getSevenDays = () => {
  let dates = [];
  for (let i = -3; i < 4; i++) {
    const date = moment().add(i, "days");
    const weekDay = date.format("ddd");
    const day = date.format("DD.MM");
    const other = date.format("YYYY-MM-DD");

    dates.push({
      weekday: weekDay,
      day: day,
      other: other,
    });
  }
  return dates;
};

export const getResultByMatch = async (id: string) => {
  let url = `http://localhost:3000/predictions/api?id=${id}`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

interface pronosticProp {
  score_home: number;
  score_visit: number;
  result: string;
}
interface resultProp {
  score_homeTeam: number;
  score_awayTeam: number;
  result: string;
}
export const calculatePoints = async(
  pronosticUser: pronosticProp,
  resultMatch: resultProp
) => {

  let point = 0;
  // comparar el pronostico
  if (pronosticUser.score_home === resultMatch.score_homeTeam) {
    point += 1
  }
  if (pronosticUser.score_visit === resultMatch.score_awayTeam) {
    point += 1;
  }
  if (pronosticUser.result === resultMatch.result) {
    point += 1;
  }
  // PENALIDAD
  if (point === 0) {
    point -= 1;
  }
  // bONUS
  if (point === 3) {
    point = 4;
  }

  return point;
};
