import styles from "./Modal.module.css";
import { capitalize } from "../../utils/utils";
import Backdrop from "./Backdrop";

type Props = {
  type: string;
  message: string;
  onClose: () => void;
};

export default function Modal({ type, message, onClose }: Props) {
  return (
    <>
      <Backdrop onClose={onClose} />
      <div className={`modal ${styles.modal}`}>
        <h3>{capitalize(type)}</h3>
        <p className={styles["modal-message"]}>{message}</p>
        <button className={styles["close-modal-button"]} onClick={onClose}>
          X
        </button>
      </div>
    </>
  );
}
