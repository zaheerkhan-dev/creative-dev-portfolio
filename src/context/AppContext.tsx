"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isNavbarOpen: boolean;
  setIsNavbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isNotFoundPage: boolean;
  setIsNotFoundPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isNotFoundPage, setIsNotFoundPage] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isNavbarOpen,
        setIsNavbarOpen,
        isNotFoundPage,
        setIsNotFoundPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
