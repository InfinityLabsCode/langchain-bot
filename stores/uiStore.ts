//Store
import { ILangchainAppStore } from './index';

export interface IUIStore {
  inProgress: boolean;
  setInProgress: (value: boolean) => void;
}

export const uiStore = (set: any, get: any): IUIStore => ({
  inProgress: false,
  setInProgress: async (value: boolean) => {
    set((state: ILangchainAppStore) => ({
      ...state,
      uiStore: { ...state.uiStore, inProgress: value }
    }));
  }
});
