import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)")
  );

  function toggle() {
    setDarkMode((prev) => !prev);
  }

  useEffect(
    function () {
      if (darkMode) {
        document.documentElement.classList.add("dark-mode");

        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");

        document.documentElement.classList.remove("dark-mode");
      }
    },
    [darkMode]
  );

  return (
    <DarkModeContext.Provider value={{ darkMode, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("Context was used outside the provider");
  return context;
}

export { DarkModeProvider, useDarkMode };
