import { createContext } from "react";

// Create Context
export const ThemeContext = createContext();

function Write() {
    return (
        <ThemeContext.Provider value={""}>
            <div>Hi! Write new post here!</div>
        </ThemeContext.Provider>
    );
}

export default Write;
