import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import chatBotIcon from '../public/assets/img/icon/parroticon.png';
import sendIcon from '../public/assets/img/icon/send.svg';

import axios from 'axios';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import langchainAppStore from '../stores';
import { ChatEnum } from '../stores/chatStore';
import { toast } from 'react-toastify';

interface IProps {
  message: string;
}

const ChatbotText: React.FC<IProps> = ({ message }) => {
  return (
    <div className="chat-item chatbot-text flex flex-col mb-[5px]">
      <span className="name text-[#a8a8a8] text-[14px]  mb-[4px]">Jess LangChain Bot</span>
      <span className="text-white chat-actual-text-chatbot">{message}</span>
    </div>
  );
};

const HumanText: React.FC<IProps> = ({ message }) => {
  return (
    <div className="chat-item human-text flex flex-col mb-[5px] items-end">
      <span className="name text-[#a8a8a8] text-[14px]  mb-[4px]">Harrison</span>
      <span className="text-white chat-actual-text-human">{message}</span>
    </div>
  );
};

const Home: NextPage = () => {
  const messageEl = useRef() as MutableRefObject<HTMLDivElement>;
  const [text, setText] = useState<string>('');
  const [progress, setProgress] = useState<boolean>(false);
  const chat = langchainAppStore((state) => state.chatStore.chat);
  const setChat = langchainAppStore((state) => state.chatStore.setChat);

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', (event: any) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, []);

  const handleSend = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_FETCH_URL}/qa/query`, { search: text });
      setChat([
        ...chat,
        {
          type: ChatEnum.Visitor,
          message: text
        },
        {
          type: ChatEnum.Bot,
          message: response.data.data as string
        }
      ]);
      setText('');
    } catch (error) {
      toast("File is too big, you api key doesn't support that much token!", {
        position: 'top-left',
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        type: 'error'
      });
    }
    setProgress(false);
  };

  return (
    <>
      <Head>
        <title>Langchain App</title>
      </Head>
      <main>
        <div className="flex h-[100%] flex-col justify-center items-center m-auto">
          <div className="chatbox-container h-[600px] w-[450px] bg-[#137b0cd6] rounded-[10px]">
            <div className="header-section p-[25px] flex gap-[10px]">
              <div className="header-image-box flex items-center justify-center w-[70px] h-[70px] bg-[#00ff5f78] rounded-[50%]">
                <Image src={chatBotIcon} alt="chatbot icon" />
              </div>
              <div className="content flex flex-col">
                <span className="text-white text-[27px]">Jess LangChain Bot</span>
                <span className="online relative text-[#aeadad]">
                  <span>Online</span>
                </span>
              </div>
            </div>
            <div className="chat-content w-[100%] h-[420px] px-[20px] " ref={messageEl}>
              <div className="chat">
                {chat.map((item, index) => {
                  return item.type === ChatEnum.Bot ? (
                    <ChatbotText key={index} message={item.message} />
                  ) : (
                    <HumanText key={index} message={item.message} />
                  );
                })}
              </div>
            </div>
            <div className="input-box-section h-[60px] bg-white flex p-[10px]">
              <input
                type="text"
                placeholder="Send a message"
                className="bg-none"
                onChange={(e) => setText(e.target.value)}
                value={text}
              />
              <button
                onClick={() => {
                  if (!text.length) return;
                  setChat([
                    ...chat,
                    {
                      type: ChatEnum.Visitor,
                      message: text
                    }
                  ]);
                  setProgress(true);
                  setTimeout(() => {
                    handleSend();
                  }, 1500);
                }}
              >
                <Image src={sendIcon} alt="send icon" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
