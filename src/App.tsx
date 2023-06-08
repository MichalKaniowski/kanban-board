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

    const body = document.querySelector("body");
    if (body) {
      body.className = themeIsDark ? "dark-theme" : "light-theme";
    }
  }, [themeIsDark]);

  function themeChangeHandler(themeIsDark: boolean) {
    setThemeIsDark(themeIsDark);
  }

  return (
    <div className={styles.body}>
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
