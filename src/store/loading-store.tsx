import { create } from 'zustand';

interface LoadingStore {
  isFirstLoad: boolean,
  setIsFirstLoad: (value: boolean) => void,
}

const useLoadingStore = create<LoadingStore>((set) => ({
  isFirstLoad: true,
  setIsFirstLoad: (value: boolean) => set({ isFirstLoad: value }),
}));

export const useIsFirstLoad = () => useLoadingStore(state => state.isFirstLoad)
export const useSetFirstLoad = () => useLoadingStore(state => state.setIsFirstLoad)