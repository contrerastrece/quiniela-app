// "use client";

// import createSupabaseServerClient from "@/lib/supabase/server";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { create } from "zustand";
interface QuinielaItem {
  id?: number;
  created_at?: string;
  score_home: number;
  score_visit: number;
  user_name: string;
  id_match: string;
  // Agrega aquí otros campos si es necesario
}

interface State {
  data: QuinielaItem[] | null;
  getQuiniela: () => Promise<void>;
  insertQuiniela: (quiniela: QuinielaItem) => Promise<void>;
}
const supabase = getSupabaseBrowserClient();

export const useQuinielaStore = create<State>((set) => ({
  // obtener los datos
  data: null,
  getQuiniela: async () => {
    try {
      const { data: quiniela } = await supabase.from("tbl_quiniela").select();
      // console.log(quiniela, "👀");
      set({ data: quiniela ?? [] });
      // return quiniela;
    } catch (error) {
      console.log(error);
    }
  },
  // insertar el score
  insertQuiniela: async (quiniela) => {
    try {
      const { data, error } = await supabase
        .from("tbl_quiniela")
        .insert(quiniela);
      if (error) {
        throw new Error(error.message);
      }
      set((state) => ({ data: state.data ? [...state.data, quiniela] : [quiniela] }));
    } catch (error) {
      console.log(error);
    }
  },
}));