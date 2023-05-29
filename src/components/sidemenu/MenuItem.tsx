import styles from "./MenuItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export default function MenuItem(props: {
  name: string;
  icon: IconDefinition;
}) {
  return (
    <li className={styles.item}>
      <FontAwesomeIcon icon={props.icon} className={styles.icon} />
      <p>{props.name}</p>
    </li>
  );
}
