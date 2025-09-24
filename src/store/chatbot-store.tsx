import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ChatState {
  chatId: string | null;
  actions: {
    setChatId: (id: string) => void;
    resetChatId: () => void;
  }
}

const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      chatId: null,

      actions: {
        setChatId: (id) => set({ chatId: id }),
        resetChatId: () => set({ chatId: null })
      }
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({
        chatId: state.chatId
      })
    }
  )
);

export const useChatBotId = () => useChatStore(state => state.chatId)
export const useChatBotActions = () => useChatStore(state => state.actions)