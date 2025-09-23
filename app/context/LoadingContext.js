'use client';

import React, { createContext, useState, useContext } from 'react';
import Loading from '../components/Loading'; 

const LoadingContext = createContext(null);

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && <Loading />}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
