import { create } from 'zustand';

// TODO: Find a better name for this
export type ChatVariant = 'chat' | 'community';

export type ChatSidebarStore = {
  collapsed: boolean;
  variant: ChatVariant;
  setCollapsed: (collapsed: boolean) => void;
  setVariant: (variant: ChatVariant) => void;
};

export const useChatSidebar = create<ChatSidebarStore>(set => ({
  collapsed: false,
  variant: 'chat',
  setCollapsed: collapsed => set({ collapsed }),
  setVariant: variant => set({ variant }),
}));
