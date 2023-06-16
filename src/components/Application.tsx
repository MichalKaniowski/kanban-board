import styles from "./Application.module.css";
import SideMenu from "./sidemenu/SideMenu";
import KanbanBoard from "./kanbanboard/KanbanBoard";
// import { KanbanContext, KanbanContextProvider } from "../store/KanbanContext";
import { ScreenContextProvider } from "../store/ScreenContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../store/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "./auth/firebase";

type Props = {
  isScreenSmall: boolean;
  isMenuOpen: boolean;
  themeIsDark: boolean;
  onMenuToggle: () => void;
  onThemeChange: (themeIsDark: boolean) => void;
};

export default function App({
  isScreenSmall,
  isMenuOpen,
  themeIsDark,
  onMenuToggle,
  onThemeChange,
}: Props) {
  const navigate = useNavigate();

  const userContext = useContext(UserContext);
  // const kanbanContext = useContext(KanbanContext);

  useEffect(() => {
    if (!userContext.isLoggedIn) {
      navigate("/auth");
    }
  }, [userContext.isLoggedIn]);

  function logOutHandler() {
    signOut(auth);
    navigate("/auth");
  }

  return (
    <ScreenContextProvider>
      <button onClick={logOutHandler} className={styles["logout-button"]}>
        Logout
      </button>
      <SideMenu
        isScreenSmall={isScreenSmall}
        isMenuOpen={isMenuOpen}
        onMenuToggle={onMenuToggle}
      />

      {!isMenuOpen && (
        <KanbanBoard
          onThemeChange={onThemeChange}
          themeIsDark={themeIsDark}
          isScreenSmall={isScreenSmall}
          isMenuOpen={isMenuOpen}
          onMenuToggle={onMenuToggle}
        />
      )}
    </ScreenContextProvider>
  );
}
