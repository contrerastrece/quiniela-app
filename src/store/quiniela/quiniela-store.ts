// 'use client'
import getUserSession from "@/lib/getUserSession";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import Swal from "sweetalert2";
import { create } from "zustand";
interface QuinielaItem {
  score_home: number;
  score_visit: number;
  // user_name: string;
  id_match: string;
  name_home: string;
  image_home: string | null;
  name_visit: string;
  image_visit: string | null;
  created_at?: string;
  // Agrega aquí otros campos si es necesario
}

interface State {
  data: QuinielaItem[] | null;
  getQuiniela: () => Promise<any[] | null | undefined>;
  insertQuiniela: (quiniela: QuinielaItem) => Promise<void>;
}
const supabase = getSupabaseBrowserClient();

export const useQuinielaStore = create<State>((set) => ({
  // obtener los datos
  data: null,
  getQuiniela: async () => {
    const {data:{user}} = await getUserSession();
    // console.log(user);
    try {
      const { data: quiniela } = await supabase
        .from("tbl_predictions")
        .select()
        .eq('id_user',user!.id)
        .order("created_at", { ascending: false });
      set({ data: quiniela ?? [] });
      return quiniela;
    } catch (error) {
      console.log(error!);
    }
  },
  // insertar el score
  insertQuiniela: async (quiniela) => {
    console.log(quiniela);
    try {
      const { data, error } = await supabase
        .from("tbl_predictions")
        .insert(quiniela);
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
}));
