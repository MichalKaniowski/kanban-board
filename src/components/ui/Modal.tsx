import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
import { capitalize } from "../../utils/utils";
import Backdrop from "./Backdrop";

type Props = {
  type: string;
  message: string;
  onClose: () => void;
};

export default function Modal({ type, message, onClose }: Props) {
  let modalTypeClass = "info";

  if (type === "error") {
    modalTypeClass = "error";
  } else if (type === "warning") {
    modalTypeClass = "warning";
  } else if (type === "info") {
    modalTypeClass = "info";
  }

  const rootOverlay = document.querySelector("#root-overlay") as Element;

  const modal = (
    <>
      <Backdrop onClose={onClose} />
      <div className={`modal ${styles.modal} ${styles[modalTypeClass]}`}>
        <h3>{capitalize(type)}</h3>
        <p className={styles["modal-message"]}>{message}</p>
        <button className={styles["close-modal-button"]} onClick={onClose}>
          X
        </button>
      </div>
    </>
  );

  return ReactDOM.createPortal(modal, rootOverlay);
}
