'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

// Type for the context value
interface ScreenWidthContextType {
  screenWidth: number;
}

// Creating the context with a default value
const ScreenWidthContext = createContext<ScreenWidthContextType>({
  screenWidth: 0,
});

export const ScreenWidthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', updateWidth);
    updateWidth();

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <ScreenWidthContext.Provider value={{ screenWidth }}>
      {children}
    </ScreenWidthContext.Provider>
  );
};

// Custom hook to use the screen width
export const useScreenWidth = () => {
  const context = useContext(ScreenWidthContext);
  if (!context) {
    throw new Error('useScreenWidth must be used within a ScreenWidthProvider');
  }
  return context;
};
