import { create } from 'zustand';

export type SidebarStore = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

export const useSidebar = create<SidebarStore>(set => ({
  collapsed: false,
  setCollapsed: collapsed => set({ collapsed }),
}));
