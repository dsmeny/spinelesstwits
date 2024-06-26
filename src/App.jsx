import { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import DbProvider from "./util/DbProvider";
import KeywordListProvider from "./util/KeywordListProvider";
import SettingsProvider from "./util/SettingsProvider";

import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import KeywordPage from "./pages/KeywordPage";
import { clear } from "./util/_cliDB.js";

const App = () => {
  const [showClearBtn, setShowClearBtn] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const showPrivacyHandler = () => {
    setShowPrivacy((prev) => !prev);
  };

  const clearBtnHandler = (state) => {
    setShowClearBtn(state);
  };

  const clearHandler = () => {
    clear();
    setShowClearBtn(false);
  };

  return (
    <BrowserRouter>
      <DbProvider>
        <SettingsProvider>
          <KeywordListProvider>
            <div className="container">
              <Nav clearHandler={clearHandler} showClearBtn={showClearBtn} />
              <div className="container-inner">
                {!showPrivacy && <Sidebar />}
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Home
                        showClearBtn={showClearBtn}
                        clearBtnHandler={clearBtnHandler}
                      />
                    }
                  />
                  <Route path="/:name" element={<KeywordPage />} />
                  <Route
                    path="/privacy-policy"
                    element={
                      <Privacy showPrivacyHandler={showPrivacyHandler} />
                    }
                  />
                </Routes>
              </div>
              <footer className="privacy">
                <Link to="/privacy-policy" onClick={showPrivacyHandler}>
                  privacy policy
                </Link>
              </footer>
            </div>
          </KeywordListProvider>
        </SettingsProvider>
      </DbProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
