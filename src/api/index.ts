import { apiOptions, matchesType } from "@/types";
import moment from "moment";

const options: apiOptions = {
  next: { revalidate: 30 },
  headers: {
    "X-Auth-Token": process.env.API_TOKEN,
    "Content-Type": "application/json",
  },
};
// obtener Partidos de las 13 competiciones (free plan)
const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");
// const hoy = moment().format("YYYY-MM-DD");
const tomorrow = moment().add(2, "days").format("YYYY-MM-DD");

export const getMatchesfootball = async () => {
  try {
    const matchData = await fetch(
      `https://api.football-data.org/v4/matches?dateFrom=${yesterday}&dateTo=${tomorrow}`,
      options
    );
    const data = await matchData.json();
    return data;
  } catch (error) {
    console.log(error, "🚩");
  }
};

export const getMatchesbyDate = async (date:string) => {
  try {
    const matchData = await fetch(
      `https://api.football-data.org/v4/matches?date=${date}`,
      options
    );
    const data = await matchData.json();
    return data;
  } catch (error) {
    console.error(error, "🚩");
  }
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
