import { useState } from "react"
import Markdown from "markdown-to-jsx"
import { connect } from "@argent/get-starknet"
import {
  Contract,
  Provider,
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