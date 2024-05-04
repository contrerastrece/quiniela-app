"use client";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { create } from "zustand";
interface User {
  id: string;
  email: string;
  picture: string;
}
const supabase = getSupabaseBrowserClient();
interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  getUsers: () => Promise<any[] | null>;
}
export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  getUsers: async () => {
    try {
      const { data: users, error } = await supabase.rpc("get_user_points");
      return users;
    } catch (error) {
      console.log(error!);
      return null;
    }
  },
}));
