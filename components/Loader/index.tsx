//Dependencies
import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';

//Store
import langchainAppStore from '../../stores';

const Loader = () => {
  const inProgress = langchainAppStore((state) => state.uiStore.inProgress);
  return (
    <>
      {inProgress && (
        <div className="w-[100%] h-[100vh] flex items-center justify-center fixed left-0 top-0 z-50 bg-black opacity-50">
          <ClipLoader color={`#36d7b7`} loading={true} size={50} />
        </div>
      )}
    </>
  );
};

export default Loader;
