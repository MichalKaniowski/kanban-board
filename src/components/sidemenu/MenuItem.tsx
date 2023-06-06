import styles from "./MenuItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export default function MenuItem({
  name,
  icon,
}: {
  name: string;
  icon: IconDefinition;
}) {
  return (
    <li className={styles.item}>
      <FontAwesomeIcon icon={icon} className={styles.icon} />
      <p>{name}</p>
    </li>
  );
}
