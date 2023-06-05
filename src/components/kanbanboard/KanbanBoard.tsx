import { nanoid } from "nanoid";
import { useContext, useEffect } from "react";
import styles from "./KanbanBoard.module.css";
import KanbanList from "./KanbanList";
import NewKanbanList from "./NewKanbanList";
import { KanbanContext } from "../../store/KanbanContext";

export default function KanbanBoard() {
  const kanbanContext = useContext(KanbanContext);

  useEffect(() => {
    const listsContainer = document.querySelector(
      "#lists-container"
    ) as Element;
    const listsLength = Number(listsContainer.children.length);
    if (listsLength === 0) {
      return;
    }

    const lastItem = listsContainer.children[listsLength - 1];
    lastItem.scrollIntoView({ behavior: "smooth", inline: "end" });
  }, [kanbanContext.lists]);

  const lists = kanbanContext.lists;

  function addListHandler(newList: string) {
    kanbanContext.onListAdd({ id: nanoid(), name: newList, items: [] });
  }

  return (
    <div className={styles["kanban-board"]}>
      <h1 className={styles["main-heading"]}>Kanban</h1>
      <div className={styles["row"]}>
        <div id="lists-container" className={styles["lists-container"]}>
          {lists.map((list) => (
            <KanbanList
              key={list.id}
              id={list.id}
              name={list.name}
              items={list.items}
            />
          ))}
        </div>
        <NewKanbanList onAdd={addListHandler} />
      </div>
    </div>
  );
}
