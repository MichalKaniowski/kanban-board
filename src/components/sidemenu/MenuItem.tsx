import styles from "./MenuItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export default function MenuItem({
  name,
  active,
  icon,
  onClick,
}: {
  name: string;
  active: boolean;
  icon: IconDefinition;
  onClick: (name: string) => void;
}) {
  return (
    <li
      onClick={() => onClick(name)}
      className={`${styles.item} ${active ? styles.active : ""}`}
    >
      <FontAwesomeIcon icon={icon} className={styles.icon} />
      <p>{name}</p>
    </li>
  );
}
