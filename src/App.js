import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  connect,
} from "@argent/get-starknet"

import Home from './components/Home';
import Post from './components/Post';
import Write from './components/Write';

// Create Context
export const ThemeContext = createContext();

function App() {
  const [wallet, setWallet] = useState(null);

  const handleConnect = async () => {
    const starknet = await connect()
    await starknet.enable();
    console.log("Connect the wallet: ", starknet.account)
    setWallet(starknet.account || "")
  }

  return (
    <ThemeContext.Provider value={wallet}>
      <Router>
        <div>
          <h2>Welcome to Startikle!</h2>
          <div>
            <Link to={'/'} className="nav-link">
              <button type="button" className="btn btn-info">Home</button>
            </Link>
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
                <>
                  <div>
                    <Link to={'/post'} className="nav-link">
                      <button type="button" className="btn btn-info">Profile</button>
                    </Link>
                    <Link to={'/write'} className="nav-link">
                      <button type="button" className="btn btn-info">New Post</button>
                    </Link>
                  </div>
                </>
            }
          </div>
          <hr />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/post' element={<Post />} />
            <Route path='/write' element={<Write />} />
          </Routes>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
