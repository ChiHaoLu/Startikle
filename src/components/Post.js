import Markdown from "markdown-to-jsx"
import { useState, createContext } from "react"
import Code from "./Code";

// Create Context
export const ThemeContext = createContext();

const Post = () => {
  const [content, setContent] = useState("# Heck Yes\n\nThis is great!");

  return (
    <ThemeContext.Provider value={""}>
      <article className="article">
        <div className="container">
          <div className="post-wrapper">
            <Markdown options={{ wrapper: 'article' }}>
              {content}
            </Markdown>;
          </div>
        </div>
      </article>
    </ThemeContext.Provider>
  )
}

export default Post