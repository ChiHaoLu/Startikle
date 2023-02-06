import { useState } from "react"
import Markdown from "markdown-to-jsx"
import {
  Contract,
  Provider,
  uint256,
  number
} from "starknet"

const Post = ({ wallet }) => {
  const [content, setContent] = useState("# Here is your Best Articles!");

  return (
    <article className="article">
      <div className="container">
        <div className="post-wrapper">
          <Markdown options={{ wrapper: 'article' }}>
            {content}
          </Markdown>
        </div>
      </div>
    </article>
  )
}

export default Post