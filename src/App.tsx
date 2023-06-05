import { useEffect, useState, useContext } from "react";
import styles from "./App.module.css";
import SideMenu from "./components/sidemenu/SideMenu";
import KanbanBoard from "./components/kanbanboard/KanbanBoard";
import { KanbanContextProvider } from "./store/KanbanContext";

function App() {
  const [themeIsDark, setThemeIsDark] = useState(false);

  useEffect(() => {
    const overlayContainer = document.querySelector("#root-overlay");
    if (overlayContainer) {
      overlayContainer.className = themeIsDark ? "dark-theme" : "light-theme";
    }
  }, [themeIsDark]);

  return (
    <div
      className={`${styles["body"]} ${
        themeIsDark ? "dark-theme" : "light-theme"
      }`}
    >
      <main className={styles.main}>
        <SideMenu />
        <KanbanContextProvider>
          <KanbanBoard />
        </KanbanContextProvider>
        <button
          onClick={() => setThemeIsDark((prevValue) => !prevValue)}
          style={{ position: "absolute", top: "30px", right: "150px" }}
        >
          theme change
        </button>
      </main>
    </div>
  );
}

export default App;
