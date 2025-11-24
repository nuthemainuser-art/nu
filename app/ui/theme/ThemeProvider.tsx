"use client";

import { createContext, useContext, useState } from "react";

const ThemeContext = createContext({
  theme: "dark",
  setTheme: (t: string) => {},
});

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState("dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
