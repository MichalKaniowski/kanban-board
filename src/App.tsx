import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import styles from "./App.module.css";
import { ScreenContext } from "./store/ScreenContext";
import Auth from "./components/auth/Auth";
import Application from "./components/Application";
import { List } from "./components/kanbanboard/KanbanBoard.types";

function App() {
  const [themeIsDark, setThemeIsDark] = useState(false);
  const [firstRun, setFirstRun] = useState(true);
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 800);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const screenContext = useContext(ScreenContext);

  function resize() {
    setIsScreenSmall(window.innerWidth < 800);
  }

  useEffect(() => {
    window.addEventListener("resize", () => {
      resize();
    });

    return () => removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    screenContext.onScreenSizeChange(isScreenSmall);
  }, [isScreenSmall]);

  useEffect(() => {
    if (
      firstRun &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setThemeIsDark(true);
      setFirstRun(false);
      return;
    }

    const body = document.querySelector("body");
    if (body) {
      body.className = themeIsDark ? "dark-theme" : "light-theme";
    }
  }, [themeIsDark]);

  function themeChangeHandler(themeIsDark: boolean) {
    setThemeIsDark(themeIsDark);
  }

  function toggleMenuHandler() {
    setIsMenuOpen((prevValue) => !prevValue);
  }

  return (
    <div className={styles.body}>
      <main
        className={`${styles.main} ${isMenuOpen ? styles["menu-open"] : ""}`}
      >
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Application
                  isScreenSmall={isScreenSmall}
                  isMenuOpen={isMenuOpen}
                  themeIsDark={themeIsDark}
                  onMenuToggle={toggleMenuHandler}
                  onThemeChange={themeChangeHandler}
                />
              }
            />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
