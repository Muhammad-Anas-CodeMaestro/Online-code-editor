import { createContext, useState } from "react";

export const themeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
    }
    return(
        <themeContext.Provider value={{ theme, toggleTheme}}>
            {children}
        </themeContext.Provider>
    )
}