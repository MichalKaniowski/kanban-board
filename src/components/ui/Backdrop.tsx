import styles from "./Backdrop.module.css";

type Props = {
  onClose: () => void;
};

export default function Backdrop({ onClose }: Props) {
  return <div className={styles.backdrop} onClick={onClose}></div>;
}
