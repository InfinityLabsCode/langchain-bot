//Dependencies
import React, { ChangeEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

import langchainAppStore from '../../../stores';
import { toast } from 'react-toastify';

const Header = () => {
  const setInProgress = langchainAppStore((state) => state.uiStore.setInProgress);

  useEffect(() => {
    setInProgress(true);
    toast('Initiating the training!', {
      position: 'top-left',
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      type: 'info'
    });
    (async () => {
      try {
        await axios.post(`${process.env.REACT_APP_FETCH_URL}/qa/initiate`);
      } catch (error) {
        toast('Files prepearing failed!', {
          position: 'top-left',
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          type: 'error'
        });
      }
      setInProgress(false);
    })();
  }, [setInProgress]);

  return (
    <div className="langchain-app-header h-[80px] justify-center flex flex-col">
      <div className="flex items-center w-full px-[8rem] justify-center">
        <Link href={'/'}>
          <div className="site-name text-[20px] font-bold text-white cursor-pointer">Langchain App</div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
