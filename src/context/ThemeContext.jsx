import { createContext, useEffect, useState } from "react";

export const themeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || "light");

    useEffect(() => {
      const root = window.document.documentElement;
      root.classList.remove(theme === 'dark' ? 'light' : 'dark')
      root.classList.add(theme)
      localStorage.setItem('theme', theme)
    }, [theme])
    
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
    }
    return(
        <themeContext.Provider value={{ theme, toggleTheme}}>
            {children}
        </themeContext.Provider>
    )
}