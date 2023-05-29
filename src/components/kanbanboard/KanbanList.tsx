import ReactDOM from "react-dom";
import { useState, useRef, useEffect } from "react";
import styles from "./Kanbanlist.module.css";
import NewItemModal from "./NewItemModal";

export default function KanbanList({ name }: { name: string }) {
  const inputRef = useRef<HTMLInputElement>(null!);
  const [listItems, setListItems] = useState([
    { name: "Task 1", category: "Feature" },
    { name: "Task 2", category: "Refactor" },
  ]);
  const [isModalDisplayed, setIsModalDisplayed] = useState(false);

  useEffect(() => {
    inputRef.current.value = name;
  }, []);

  function nameChangeHandler(e: React.FormEvent) {
    e.preventDefault();
    inputRef.current.blur();
  }

  function buttonClickHandler() {
    setIsModalDisplayed(true);
  }

  return (
    <div className={styles.container}>
      {isModalDisplayed &&
        ReactDOM.createPortal(
          <NewItemModal />,
          document.querySelector("#root-overlay")
        )}

      <form onSubmit={nameChangeHandler}>
        <input ref={inputRef} />
      </form>
      <button
        className={styles["add-task-button"]}
        onClick={buttonClickHandler}
      >
        +
      </button>
      <ul>
        {listItems.map((item) => {
          return (
            <li>
              <p>{item.name}</p>
              <span className={styles.category}>{item.category}</span>
              <button className={styles["edit-button"]}>Edit</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
