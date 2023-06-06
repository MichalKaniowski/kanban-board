import { nanoid } from "nanoid";
import { useState } from "react";
import styles from "./SideMenu.module.css";
import MenuItem from "./MenuItem";
import {
  faHouse,
  faTableCellsLarge,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../ui/Modal";

const menuItems = [
  { name: "Dashboard", icon: faHouse },
  { name: "Team", icon: faUserGroup },
  { name: "Kanban", icon: faTableCellsLarge },
];

export default function SideMenu() {
  const [activeCategory] = useState("Kanban");
  const [error, setError] = useState("");

  function menuItemClickHandler(name: string) {
    if (name !== "Kanban") {
      setError("This feature will be added in the future. Stay tuned!");
    }
  }

  return (
    <div className={styles["side-menu"]}>
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

      {error && (
        <Modal type="info" message={error} onClose={() => setError("")} />
      )}
    </div>
  );
}
