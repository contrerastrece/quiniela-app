import { Match, apiOptions } from "@/types";
import moment from "moment";

const options: apiOptions = {
  next: { revalidate: 30 },
  headers: {
    "X-Auth-Token": process.env.API_TOKEN,
    "Content-Type": "application/json",
  },
};

export const getMatches = async (day: string) => {
  const nextDay = moment(day).add(2, "days").format("YYYY-MM-DD");
  try {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/api?dateFrom=${day}&dateTo=${nextDay}`;
    // let url = `https://quiniela-app-opal.vercel.app/api?dateFrom=${day}&dateTo=${nextDay}`;
    const response = await fetch(url);
    const data = await response.json();
    const grouped = groupMatchesByDate(data);
    // console.log(grouped);

    return grouped;
  } catch (error) {
    console.error(error, "🚩");
  }
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


