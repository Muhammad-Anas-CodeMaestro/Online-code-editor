import { createContext } from "react";

export const themeContext = createContext();

export const ThemeProvider = ({ children }) => {
    return(
        <themeContext.Provider>
            {children}
        </themeContext.Provider>
    )
}