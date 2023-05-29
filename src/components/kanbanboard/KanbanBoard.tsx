import { useState } from "react";
import styles from "./KanbanBoard.module.css";
import KanbanList from "./KanbanList";
import NewKanbanList from "./NewKanbanList";

export default function KanbanBoard() {
  const [lists, setLists] = useState(["Agenda", "To do", "Doing", "Done"]);

  function addListHandler(newList: string) {
    setLists((prevLists) => [...prevLists, newList]);
  }

  return (
    <div className={styles["kanban-board"]}>
      <h1 className={styles["main-heading"]}>Kanban</h1>
      <ul className={styles["row"]}>
        <div className={styles["lists-container"]}>
          {lists.map((list) => (
            <KanbanList name={list} />
          ))}
        </div>
        <NewKanbanList onAdd={addListHandler} />
      </ul>
    </div>
  );
}
