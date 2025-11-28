"use client";

import { createContext, useContext, useState } from "react";

type ThemeID = "classic" | "glass" | "sphere";

const ThemeContext = createContext<{
  theme: ThemeID;
  setTheme: (t: ThemeID) => void;
}>({
  theme: "classic",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeID>("classic");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
