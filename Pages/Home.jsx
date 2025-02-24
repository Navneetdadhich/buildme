import React from "react";
import App from "../src/App";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Carousal from "./Carousal";
import { useEffect, useState } from "react";
import '../src/App.css'
import demo from '../src/assets/demo.png'


const Home = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("app")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return (
    <>
      {visible === false ? (
        <div class="carr">
          
            <Carousal/>


          <div class="blob-outer-container">
            <div class="blob-inner-container">
              <div class="blob"></div>
            </div>
          </div>

          {/* <Link to={"/app"}>
            <button className="but">Get Started</button>
          </Link> */}
        </div>
      ) : (
        ""
      )}

      <Routes>
        <Route path="/app" element={<App />} />
      </Routes>
    </>
  );
};

export default Home;
