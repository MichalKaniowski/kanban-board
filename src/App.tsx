import { useEffect, useState, useContext } from "react";
import styles from "./App.module.css";
import SideMenu from "./components/sidemenu/SideMenu";
import KanbanBoard from "./components/kanbanboard/KanbanBoard";
import { KanbanContextProvider } from "./store/KanbanContext";
import { ScreenContextProvider } from "./store/ScreenContext";
import { ScreenContext } from "./store/ScreenContext";

function App() {
  const [themeIsDark, setThemeIsDark] = useState(false);
  const [firstRun, setFirstRun] = useState(true);
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 800);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const screenContext = useContext(ScreenContext);

  useEffect(() => {
    screenContext.onScreenSizeChange(isScreenSmall);
  }, [isScreenSmall]);

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
        <ScreenContextProvider>
          <SideMenu
            isScreenSmall={isScreenSmall}
            isMenuOpen={isMenuOpen}
            onMenuToggle={toggleMenuHandler}
          />

          <KanbanContextProvider>
            {!isMenuOpen && (
              <KanbanBoard
                onThemeChange={themeChangeHandler}
                themeIsDark={themeIsDark}
                isScreenSmall={isScreenSmall}
                isMenuOpen={isMenuOpen}
                onMenuToggle={toggleMenuHandler}
              />
            )}
          </KanbanContextProvider>
        </ScreenContextProvider>
      </main>
    </div>
  );
}

export default App;
