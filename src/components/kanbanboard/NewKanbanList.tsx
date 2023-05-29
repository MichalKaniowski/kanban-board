import styles from "./NewKanbanList.module.css";

type Props = {
  onAdd: (newList: string) => void;
};

export default function NewKanbanList({ onAdd }: Props) {
  return (
    <button
      className={styles["new-list-button"]}
      onClick={() => onAdd("New List")}
    >
      Create new list
    </button>
  );
}
