import React, { createContext, useContext, useState } from 'react';

const ServerContext = createContext();

export const ServerProvider = ({ children }) => {
  //첫 번째 API를 기본 serverURL로 설정
  const [serverURL, setServerURL] = useState('https://api.example.com');

  return (
    <ServerContext.Provider value={{ serverURL, setServerURL }}>
      {children}
    </ServerContext.Provider>
  );
};

export const useServer = () => useContext(ServerContext);
