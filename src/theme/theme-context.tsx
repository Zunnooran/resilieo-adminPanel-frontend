import React, { ReactNode, createContext, useContext, useMemo, useState } from 'react';

import { ConfigProvider as AntdConfigProvider, theme } from 'antd';

interface ThemeContextProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);

  const contextValue = useMemo(() => {
    function toggleTheme() {
      setIsDarkMode((prev) => !prev);
    }
    return {
      isDarkMode,
      toggleTheme,
    };
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <AntdConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        {children}
      </AntdConfigProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
