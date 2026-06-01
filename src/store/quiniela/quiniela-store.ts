import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { swal } from "@/lib/swal";
import { create } from "zustand";

interface QuinielaItem {
  score_home: number;
  score_visit: number;
  id_match: string;
  name_home: string;
  image_home: string | null;
  name_visit: string;
  image_visit: string | null;
  created_at?: string;
  points?: number | null;
  status_match?: string | null;
  result_visit?: number | null;
  result_home?: number | null;
  competition_id?: number | null;
  competition_name?: string | null;
}

interface State {
  data: QuinielaItem[] | null;
  getQuiniela: () => Promise<any[] | null | undefined>;
  insertQuiniela: (quiniela: QuinielaItem) => Promise<void>;
  updateQuiniela: (p: {
    id_match: string;
    points: number;
    status_match: string;
    result_home: number;
    result_visit: number;
  }) => Promise<any[] | null | undefined>;
}

const supabase = getSupabaseBrowserClient();

export const useQuinielaStore = create<State>((set) => ({
  data: null,
  getQuiniela: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    try {
      const { data: quiniela } = await supabase
        .from("tbl_predictions")
        .select()
        .eq("id_user", user.id)
        .order("created_at", { ascending: false });
      set({ data: quiniela ?? [] });
      return quiniela;
    } catch (error) {
      console.log(error!);
    }
  },
  insertQuiniela: async (quiniela) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from("tbl_predictions")
        .insert({ ...quiniela, id_user: user.id });
      swal.fire({
        title: "Agregado",
        text: "Tu pronóstico ha sido agregado con éxito.",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      if (error) {
        swal.fire({
          title: "Error",
          text: `Ha ocurrido un error: ${error.message}`,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
        throw new Error(error.message);
      }
      set((state) => ({
        data: state.data ? [...state.data, quiniela] : [quiniela],
      }));
    } catch (error) {
      console.log(error);
    }
  },
  updateQuiniela: async (p) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    try {
      const { data } = await supabase
        .from("tbl_predictions")
        .update({
          status_match: p.status_match,
          result_home: p.result_home,
          result_visit: p.result_visit,
        })
        .eq("id_user", user.id)
        .eq("id_match", p.id_match);
      return data;
    } catch (error) {
      alert(error);
    }
  },
}));
