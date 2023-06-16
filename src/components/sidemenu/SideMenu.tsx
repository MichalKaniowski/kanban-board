import { nanoid } from "nanoid";
import { useState } from "react";
import styles from "./SideMenu.module.css";
import MenuItem from "./MenuItem";
import {
  faHouse,
  faTableCellsLarge,
  faUserGroup,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../ui/Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const menuItems = [
  { name: "Dashboard", icon: faHouse },
  { name: "Team", icon: faUserGroup },
  { name: "Kanban", icon: faTableCellsLarge },
];

type Props = {
  isScreenSmall: boolean;
  isMenuOpen: boolean;
  onMenuToggle: () => void;
};

export default function SideMenu({
  isScreenSmall,
  isMenuOpen,
  onMenuToggle,
}: Props) {
  const [activeCategory] = useState("Kanban");
  const [error, setError] = useState("");

  function menuItemClickHandler(name: string) {
    if (name !== "Kanban") {
      setError("This feature will be added in the future. Stay tuned!");
    }
  }

  const sideMenuContent = (
    <>
      <h2 className={styles.brand}>Productivio</h2>
      <ul className={styles["menu-list"]}>
        {menuItems.map((item) => (
          <MenuItem
            key={nanoid()}
            name={item.name}
            active={item.name === activeCategory}
            icon={item.icon}
            onClick={menuItemClickHandler}
          />
        ))}
      </ul>
    </>
  );

  let sideMenuClasses = `${styles["side-menu"]} `;

  if (isScreenSmall) {
    if (isMenuOpen) {
      sideMenuClasses += styles["full-screen"];
    }
    if (!isMenuOpen) {
      sideMenuClasses += styles.closed;
    }
  }

  return (
    <div className={sideMenuClasses}>
      {isScreenSmall && isMenuOpen && (
        <>
          <FontAwesomeIcon
            icon={faX}
            onClick={onMenuToggle}
            className={styles["menu-icon"]}
          />
          {sideMenuContent}
        </>
      )}

      {!isScreenSmall && sideMenuContent}

      {error && (
        <Modal type="info" message={error} onClose={() => setError("")} />
      )}
    </div>
  );
}
