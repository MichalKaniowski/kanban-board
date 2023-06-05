import { nanoid } from "nanoid";
import { useState } from "react";
import styles from "./SideMenu.module.css";
import MenuItem from "./MenuItem";
import {
  faHouse,
  faTableCellsLarge,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

const menuItems = [
  { name: "Dashboard", icon: faHouse },
  { name: "Team", icon: faUserGroup },
  { name: "Kanban", icon: faTableCellsLarge },
];

export default function SideMenu() {
  const [activeItem, setActiveItem] = useState("Kanban");

  return (
    <div className={styles["side-menu"]}>
      <h2 className={styles.brand}>Productivio</h2>
      <ul className={styles["menu-list"]}>
        {menuItems.map((item) => (
          <MenuItem
            key={nanoid()}
            name={item.name}
            icon={item.icon}
            classes={activeItem === item.name ? "active" : ""}
          />
        ))}
      </ul>
    </div>
  );
}
