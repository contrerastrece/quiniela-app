import { getMatchesbyDate, getMatchesfootballByWeek } from "@/api";
import { create } from "zustand";
interface MatchState {
  data: any[];
  dataWeek: any[];
  getMatches: (dia: string) => Promise<void>;
  getMatchesByWeek: () => Promise<void>;
}

export const useMatchStore = create<MatchState>((set) => ({
  data: [],
  dataWeek: [],
  getMatches: async (dia: string) => {
    try {
      const response = await getMatchesbyDate(dia);
      set({ data: response });
      return response;
    } catch (error) {
      console.error("Error al obtener los partidos:", error);
      return [];
    }
  },
  getMatchesByWeek: async () => {
    try {
      const response = await getMatchesfootballByWeek();
      set({ dataWeek: response });
    } catch (error) {
      console.log("Error al obtener los partidos por semana:", error);
    }
  }, //
}));
