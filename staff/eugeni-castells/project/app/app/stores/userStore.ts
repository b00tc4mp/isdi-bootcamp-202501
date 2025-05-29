import { create } from "zustand";

import { isUserLoggedIn } from "@/services";

type Role = "regular" | "anonym" | "admin" | null;

//Serà el tipus que tindrà el userStore
type UserState = {
  isActive: () => Promise<boolean>;
  role: Role;
  setRole: (role: Role) => void;
  clearRole: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  role: null,

  isActive: function () {
    return isUserLoggedIn().then((result) => result);
  },
  /*Aquestes linies és com si féssim: 
  set((state) => ({
  ...state,
  role: role, 
}))
Però Zustand ens ho deixa escurçar a set({role})
*/
  setRole: (role) => set({ role }),
  clearRole: () => set({ role: null }),
}));
