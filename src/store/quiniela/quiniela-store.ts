// 'use client'
import getUserSession from "@/lib/getUserSession";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import Swal from "sweetalert2";
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
  // obtener los datos
  data: null,
  getQuiniela: async () => {
    const {
      data: { user },
    } = await getUserSession();
    // console.log(user);
    try {
      const { data: quiniela } = await supabase
        .from("tbl_predictions")
        .select()
        .eq("id_user", user!.id)
        .order("created_at", { ascending: false });
      set({ data: quiniela ?? [] });
      return quiniela;
    } catch (error) {
      console.log(error!);
    }
  },
  // insertar el score
  insertQuiniela: async (quiniela) => {
    // console.log(quiniela);
    const dataUser = await getUserSession();
    try {
      const { data, error } = await supabase
        .from("tbl_predictions")
        .insert({ ...quiniela, id_user: dataUser!.data!.user!.id });
      Swal.fire({
        title: "Agregado",
        text: "Tu pronóstico ha sido agregado con exito.",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      if (error) {
        Swal.fire({
          title: "Error",
          text: `Ha ocurrido un error .${error.message}`,
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
    const {
      data: { user },
    } = await getUserSession();

    try {
      const { data } = await supabase
        .from("tbl_predictions")
        .update({
          status_match: p.status_match,
          result_home: p.result_home,
          result_visit: p.result_visit,
        })
        .eq("id_user", user!.id)
        .eq("id_match", p.id_match);
      return data;
    } catch (error) {
      alert(error);
    }
  },
}));
