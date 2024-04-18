import { getMatchesbyDate } from "@/api";
import { create } from "zustand";
interface MatchState {
  data: any[];
  getMatches: (dia: string) => Promise<void>;
}

export const useMatchStore = create<MatchState>((set) => ({
  data: [],
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
}));
