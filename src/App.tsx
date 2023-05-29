import { useState } from "react";
import styles from "./App.module.css";
import SideMenu from "./components/sidemenu/SideMenu";
import KanbanBoard from "./components/kanbanboard/KanbanBoard";

function App() {
  const [themeIsDark, setThemeIsDark] = useState(false);

  return (
    <div
      className={`${styles["body"]} ${
        themeIsDark ? "dark-theme" : "light-theme"
      }`}
    >
      <main className={styles.main}>
        <SideMenu />
        <KanbanBoard />
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
