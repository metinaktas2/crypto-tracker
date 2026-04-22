import { createContext, useContext, useEffect, useState } from "react";

//create Theme Context
export const ThemeContext = createContext();

//create Theme Provider
export const ThemeProvider = ({ children }) => {
  //theme state
  const [isDarkMode, setIsDarkmode] = useState(() => {
    //If there is selected theme in localStorage, use it
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      return localTheme === "dark";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  //function to change the theme
  const toggleTheme = () => {
    setIsDarkmode((prev) => !prev);
  };

  //update interface when theme changes
  useEffect(() => {
    const root = window.document.documentElement;

    if (isDarkMode) {
      root.classList.add("dark");

      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

//Custom hook
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("provider'ı ile sarmala");
  }

  return context;
};
