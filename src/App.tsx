import { useEffect, useState } from "react";
import styles from "./App.module.css";
import SideMenu from "./components/sidemenu/SideMenu";
import KanbanBoard from "./components/kanbanboard/KanbanBoard";
import { KanbanContextProvider } from "./store/KanbanContext";

function App() {
  const [themeIsDark, setThemeIsDark] = useState(false);
  const [firstRun, setFirstRun] = useState(true);

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

    //for modals to have access to global variables
    const overlayContainer = document.querySelector("#root-overlay");
    if (overlayContainer) {
      overlayContainer.className = themeIsDark ? "dark-theme" : "light-theme";
    }
  }, [themeIsDark]);

  function themeChangeHandler(themeIsDark: boolean) {
    setThemeIsDark(themeIsDark);
  }

  return (
    <div
      className={`${styles["body"]} ${
        themeIsDark ? "dark-theme" : "light-theme"
      }`}
    >
      <main className={styles.main}>
        <SideMenu />
        <KanbanContextProvider>
          <KanbanBoard
            onThemeChange={themeChangeHandler}
            themeIsDark={themeIsDark}
          />
        </KanbanContextProvider>
      </main>
    </div>
  );
}

export default App;
