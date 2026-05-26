export type apiOptions = {
  next: any;
  headers: {
    "X-Auth-Token": string | any;
    "Content-Type": string | any;
  };
};

export interface MatchesType {
  filters: Filters;
  resultSet: ResultSet;
  matches: Match[];
}

export interface Filters {
  dateFrom: Date;
  dateTo: Date;
  permission: string;
}

export interface Match {
  area: Area;
  competition: Competition;
  season: Season;
  id: number;
  utcDate: Date;
  status: Status;
  matchday: number;
  stage: Stage;
  group: null | string;
  lastUpdated: Date;
  homeTeam: Team;
  awayTeam: Team;
  score: Score;
  odds: Odds;
  referees: Referee[];
}

export interface Area {
  id: number;
  name: AreaName;
  code: AreaCode;
  flag: string;
}

export enum AreaCode {
  Deu = "DEU",
  Eng = "ENG",
  Esp = "ESP",
  Fra = "FRA",
  Ita = "ITA",
  Nld = "NLD",
  Por = "POR",
  Sam = "SAM",
}

export enum AreaName {
  England = "England",
  France = "France",
  Germany = "Germany",
  Italy = "Italy",
  Netherlands = "Netherlands",
  Portugal = "Portugal",
  SouthAmerica = "South America",
  Spain = "Spain",
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: null | string;
  crest: null | string;
}

export interface Competition {
  id: number;
  name: CompetitionName;
  code: CompetitionCode;
  type: CompetitionType;
  emblem: string;
}

export enum CompetitionCode {
  Bl1 = "BL1",
  CLI = "CLI",
  Ded = "DED",
  Elc = "ELC",
  Fl1 = "FL1",
  PD = "PD",
  Pl = "PL",
  Ppl = "PPL",
  Sa = "SA",
}

export enum CompetitionName {
  Bundesliga = "Bundesliga",
  Championship = "Championship",
  CopaLibertadores = "Copa Libertadores",
  Eredivisie = "Eredivisie",
  Ligue1 = "Ligue 1",
  PremierLeague = "Premier League",
  PrimeiraLiga = "Primeira Liga",
  PrimeraDivision = "Primera Division",
  SerieA = "Serie A",
}

export enum CompetitionType {
  Cup = "CUP",
  League = "LEAGUE",
}

export interface Odds {
  msg: Msg;
}

export enum Msg {
  ActivateOddsPackageInUserPanelToRetrieveOdds = "Activate Odds-Package in User-Panel to retrieve odds.",
}

export interface Referee {
  id: number;
  name: string;
  type: RefereeType;
  nationality: string;
}

export enum RefereeType {
  Referee = "REFEREE",
}

export interface Score {
  winner: Winner;
  duration: Duration;
  fullTime: Time;
  halfTime: Time;
  regularTime?: Time;
  extraTime?: Time;
  penalties?: Time;
}

// score: {
//   winner: 'AWAY_TEAM',
//   duration: 'PENALTY_SHOOTOUT',
//   fullTime: { home: 4, away: 5 },
//   halfTime: { home: 0, away: 1 },
//   regularTime: { home: 1, away: 1 },
//   extraTime: { home: 0, away: 0 },
//   penalties: { home: 3, away: 4 }
// },

export enum Duration {
  Regular = "REGULAR",
  PenaltyShootout = "PENALTY_SHOOTOUT",
}

export interface Time {
  home: number;
  away: number;
}

export enum Winner {
  AwayTeam = "AWAY_TEAM",
  Draw = "DRAW",
  HomeTeam = "HOME_TEAM",
}

export interface Season {
  id: number;
  startDate: Date;
  endDate: Date;
  currentMatchday: number;
  winner: null;
}

export enum Stage {
  GroupStage = "GROUP_STAGE",
  RegularSeason = "REGULAR_SEASON",
}

export enum Status {
  Finished = "FINISHED",
  InPlay = "IN_PLAY",
  Postponed = "POSTPONED",
  Timed = "TIMED",
  Paused = "PAUSED",
}

export interface ResultSet {
  count: number;
  competitions: string;
  first: Date;
  last: Date;
  played: number;
}
