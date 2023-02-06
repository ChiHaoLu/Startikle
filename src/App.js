import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { connect } from "@argent/get-starknet"
import {
  Contract,
  Provider,
  number
} from "starknet"

import Home from './components/Home';
import Post from './components/Post';
import Write from './components/Write';

function App() {
  const [wallet, setWallet] = useState(null);

  const handleConnect = async () => {
    const starknet = await connect()
    await starknet.enable();
    console.log("Connect the wallet: ", starknet.account)
    setWallet(starknet.account || "")
  }

  return (
      <Router>
        <div>
          <h2>Welcome to Startikle!</h2>
          <div>
            <Link to={'/'} className="nav-link">
              <button type="button" className="btn btn-info">Home</button>
            </Link>
            <a href="https://chihaolu.gitbook.io/startikle/" target="_blank">
            <button>White Paper & User Guide</button>
            </a>
            {
              wallet ?
                <button
                  onClick={() => {
                    handleConnect()
                  }}
                >
                  <strong>Login</strong>
                </button >
                :
                <div>
                  <Link to={'/post'} className="nav-link">
                    <button type="button" className="btn btn-info">Profile</button>
                  </Link>
                  <Link to={'/write'} className="nav-link">
                    <button type="button" className="btn btn-info">New Post</button>
                  </Link>
                </div>
            }
          </div>
          <hr />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/post' element={<Post wallet={wallet} />} />
            <Route path='/write' element={<Write wallet={wallet} />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
