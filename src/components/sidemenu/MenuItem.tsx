import styles from "./MenuItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

// make classes working
//przypomnij sobie jak sie robiło tak zeby dac classname na component i żeby to rozpoznawało o co chodzi w ts

export default function MenuItem({
  name,
  icon,
  classes,
}: {
  name: string;
  icon: IconDefinition;
  classes: string;
}) {
  return (
    <li className={`${styles.item} ${styles.classes}`}>
      <FontAwesomeIcon icon={icon} className={styles.icon} />
      <p>{name}</p>
    </li>
  );
}
