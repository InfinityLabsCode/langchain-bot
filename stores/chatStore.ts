//Store
import { ILangchainAppStore } from './index';

export enum ChatEnum {
  Bot = 0,
  Visitor = 1
}
export interface IChat {
  type: ChatEnum;
  message: string;
}

export interface IChatStore {
  chat: IChat[];
  setChat: (value: IChat[]) => void;
}

export const chatStore = (set: any, get: any): IChatStore => ({
  chat: [{ type: ChatEnum.Bot, message: "Hello! I am a pre-trained AI agent and am happy to answer any questions about the beautiful city of Salvador, Bahia. I can also answer some questions about my favorite framework, LangChain!" }],
  setChat: async (list: IChat[]) => {
    set((state: ILangchainAppStore) => ({
      ...state,
      chatStore: { ...state.chatStore, chat: list }
    }));
  }
});
