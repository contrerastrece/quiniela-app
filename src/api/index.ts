import { apiOptions, matchesType } from "@/types";

const options: apiOptions = {
  next: { revalidate: 30 },
  headers: {
    "X-Auth-Token": process.env.API_TOKEN,
    "Content-Type": "application/json",
  },
};
// obtener Partidos de las 13 competiciones (free plan)
export const getMatchesfootball = async () => {
  const matchData = await fetch(
    "https://api.football-data.org/v4/matches",
    options
  );
  return matchData.json();
};

const todayDate = new Date();
const getDateMonth = new Date(todayDate.getTime());
getDateMonth.setDate(todayDate.getDate() - 1);
const year = getDateMonth.getFullYear();
const month = String(getDateMonth.getMonth() + 1).padStart(2, "0");
const day = String(getDateMonth.getDate()).padStart(2, "0");

const yesterday = [year, month, day].join("-");
console.log(yesterday);
const fechaEspecifica = "2024-04-15";
export const getMatchesfootballFinished = async () => {

  try {
    const matchData = await fetch(
      `https://api.football-data.org/v4/matches?dateFrom=${fechaEspecifica}&dateTo=${'2024-04-20'}`,
      // `https://api.football-data.org/v4/matches?date=${'2024-04-17'}`,
      options
    );
    const data=await matchData.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error,'🚩')
  }
};

export const filterLeague = async (filterData: string) => {
  const getEnglishLeague = await getMatchesfootball();
  const filterPremierLeague: matchesType[] = getEnglishLeague?.matches;
  const getData = filterPremierLeague.filter(
    (item) => item.competition.name === filterData
  );
  return getData;
};
