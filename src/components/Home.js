import { createContext } from "react";

// Create Context
export const ThemeContext = createContext();

function Home() {
    return (
        <ThemeContext.Provider value={""}>
            <div>Hi! Here is Home!</div>
        </ThemeContext.Provider>
    );
}

export default Home;
