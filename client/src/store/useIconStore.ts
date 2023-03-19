import { createStore } from 'zustand';
import { type IconStore } from './types/IconStore';

const useIconStore = createStore<IconStore>((set) => ({
  showIcon: false,
  toggleIcon: () => { set((state) => ({ showIcon: !state.showIcon })); }
}));

export default useIconStore;
