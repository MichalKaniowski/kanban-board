import { nanoid } from "nanoid";
import ReactDOM from "react-dom";
import { useState, useRef, useEffect, useContext } from "react";
import styles from "./Kanbanlist.module.css";
import NewItemModal from "./NewItemModal";
import { KanbanContext } from "../../store/KanbanContext";
import { List, ListItem } from "./KanbanBoard.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPlus,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../ui/Modal";

export default function KanbanList({ id, name, items }: List) {
  const inputRef = useRef<HTMLInputElement>(null!);
  const [isModalDisplayed, setIsModalDisplayed] = useState(false);
  const [editingItem, setEditingItem] = useState<ListItem | null>(null);
  const [error, setError] = useState("");

  const kanbanContext = useContext(KanbanContext);

  const [animation, setAnimation] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setAnimation(true);
    }, 1000);
  }, []);

  useEffect(() => {
    inputRef.current.value = name;
  }, []);

  function nameChangeHandler(e: React.FormEvent) {
    e.preventDefault();
    inputRef.current.blur();
  }

  function buttonClickHandler(item: ListItem | null) {
    if (item) {
      setIsModalDisplayed(true);
      setEditingItem(item);
    } else {
      setIsModalDisplayed(true);
    }
  }

  function addItemHandler(item: ListItem) {
    setIsModalDisplayed(false);

    kanbanContext.onItemAdd(id, { ...item });
  }

  function editItemHandler(item: ListItem) {
    setIsModalDisplayed(false);
    kanbanContext.onItemEdit(id, { ...item });
  }

  function deleteListHandler() {
    setTimeout(() => {
      kanbanContext.onListRemove(id);
    }, 500);
  }

  function itemErrorHandler(message: string) {
    setError(message);
  }

  function closeModalHandler() {
    setError("");
    setIsModalDisplayed(false);
  }

  const rootOverlay = document.querySelector("#root-overlay") as Element;

  return (
    <div
      className={`${styles.container} ${
        !animation ? styles.animation : styles["animation-end"]
      }`}
    >
      {isModalDisplayed &&
        !editingItem &&
        !error &&
        ReactDOM.createPortal(
          <NewItemModal
            onItemAdd={addItemHandler}
            onClose={() => setIsModalDisplayed(false)}
            onItemError={itemErrorHandler}
          />,
          rootOverlay
        )}

      {isModalDisplayed &&
        editingItem &&
        !error &&
        ReactDOM.createPortal(
          <NewItemModal
            editingItem={editingItem}
            onItemEdit={editItemHandler}
            onClose={() => setIsModalDisplayed(false)}
            onItemError={itemErrorHandler}
          />,
          rootOverlay
        )}

      {error &&
        ReactDOM.createPortal(
          <Modal type="error" message={error} onClose={closeModalHandler} />,
          rootOverlay
        )}

      <form onSubmit={nameChangeHandler}>
        <input ref={inputRef} />
      </form>
      <button
        className={styles["add-task-button"]}
        onClick={() => buttonClickHandler(null)}
      >
        <FontAwesomeIcon icon={faPlus} className={styles.icon} />
      </button>
      <button
        className={styles["delete-list-button"]}
        onClick={deleteListHandler}
      >
        <FontAwesomeIcon icon={faTrashCan} className={styles.icon} />
      </button>

      <ul>
        {items.map((item) => {
          return (
            <li key={nanoid()}>
              <p>{item.name}</p>
              <span
                className={`${styles[item.category.toLowerCase()]} ${
                  styles.category
                }`}
              >
                {item.category}
              </span>
              <button
                onClick={() => buttonClickHandler(item)}
                className={styles["edit-button"]}
              >
                <FontAwesomeIcon
                  icon={faPencil}
                  size="sm"
                  className={styles.icon}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
