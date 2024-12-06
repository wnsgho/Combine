import { create } from "zustand";

interface UserStore {
    //유저 역할
    role: string | null;
    setRole: (role: string | null) => void;
}

const useUserStore = create<UserStore>((set) => ({
    role: null,
    setRole: (role) => set({ role }),
}));

export default useUserStore;