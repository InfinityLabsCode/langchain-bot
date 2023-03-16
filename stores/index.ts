import { create, StoreApi, UseBoundStore } from 'zustand';
import { uiStore, IUIStore } from './uiStore';
import { chatStore, IChatStore } from './chatStore';

import { devtools } from 'zustand/middleware';

export interface ILangchainAppStore {
  uiStore: IUIStore;
  chatStore: IChatStore;
}

const langchainAppStore: UseBoundStore<StoreApi<ILangchainAppStore>> = create(
  devtools((set, get) => ({
    uiStore: uiStore(set, get),
    chatStore: chatStore(set, get)
  }))
);

export default langchainAppStore;
