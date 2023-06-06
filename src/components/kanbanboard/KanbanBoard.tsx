import { nanoid } from "nanoid";
import { useContext, useEffect } from "react";
import styles from "./KanbanBoard.module.css";
import KanbanList from "./KanbanList";
import NewKanbanList from "./NewKanbanList";
import { KanbanContext } from "../../store/KanbanContext";

export default function KanbanBoard() {
  const kanbanContext = useContext(KanbanContext);
  const kanbanListsLength = kanbanContext.lists.length;

  useEffect(() => {
    const listsContainer = document.querySelector(
      "#lists-container"
    ) as Element;

    //horizontal scrolling
    window.addEventListener("wheel", function (e) {
      const isInsideContainer =
        e.target === listsContainer ||
        listsContainer.contains(e.target as Node);

      if (isInsideContainer) {
        if (e.deltaY > 0) {
          listsContainer.scrollLeft += 20;
        } else {
          listsContainer.scrollLeft -= 20;
        }
      }
    });

    //automatic scrolling when new list is added
    const listsLength = Number(listsContainer.children.length);
    if (listsLength === 0) {
      return;
    }

    const lastItem = listsContainer.children[listsLength - 1];
    lastItem.scrollIntoView({ behavior: "smooth", inline: "end" });
  }, [kanbanListsLength]);

  const lists = kanbanContext.lists;

  function addListHandler(newList: string) {
    kanbanContext.onListAdd({ id: nanoid(), name: newList, items: [] });
  }

  return (
    <div className={styles["kanban-board"]}>
      <h1 className={styles["main-heading"]}>Kanban</h1>
      <div className={styles.row}>
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
