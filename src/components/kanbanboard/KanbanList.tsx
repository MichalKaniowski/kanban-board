import { nanoid } from "nanoid";
import { useState, useRef, useEffect, useContext } from "react";
import styles from "./Kanbanlist.module.css";
import NewItemModal from "./NewItemModal";
import { KanbanContext } from "../../store/KanbanContext";
import { ListItem } from "./KanbanBoard.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPlus,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../ui/Modal";
import { ModifiedCategory } from "./KanbanBoard.types";
import { transformFirebaseObject } from "../../utils/kanban-utils";

type Props = {
  id: string;
  name: string;
  items: ListItem[];
  categories: ModifiedCategory[];
  inputValue: string;
};

export default function KanbanList({
  id,
  name,
  items,
  categories,
  inputValue,
}: Props) {
  // console.log(items);
  const initialItems = items.map((item) => {
    const category = item.category;

    return {
      ...item,
      category: {
        id: category.id,
        name: category.name,
        backgroundColor: category.backgroundColor,
      },
    };
  });
  console.log("intitial items: ", initialItems);
  const [filteredItems, setFilteredItems] = useState(initialItems);
  const [isModalDisplayed, setIsModalDisplayed] = useState(false);
  const [editingItem, setEditingItem] = useState<ListItem | null>(null);
  const [error, setError] = useState("");

  const inputRef = useRef<HTMLInputElement>(null!);
  const kanbanContext = useContext(KanbanContext);

  useEffect(() => {
    inputRef.current.value = name;
  }, []);

  useEffect(() => {
    const activeCategories = categories
      .filter((category) => category.active)
      .map((category) => category.name);

    const itemsFilteredByCategorie = initialItems.filter((item) => {
      console.log(item.category.name);
      return activeCategories.includes(item.category.name);
    });

    console.log(itemsFilteredByCategorie);

    const itemsFilteredByInputValue = itemsFilteredByCategorie.filter((item) =>
      item.name.toLowerCase().includes(inputValue.trim().toLowerCase())
    );

    setFilteredItems(itemsFilteredByInputValue);
  }, [items, categories, inputValue]);

  function nameChangeHandler(e: React.FormEvent) {
    e.preventDefault();
    inputRef.current.blur();
  }

  function buttonClickHandler(item: ListItem | null) {
    if (item) {
      setIsModalDisplayed(true);
      setEditingItem(item);
    } else {
      setEditingItem(null);
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
    kanbanContext.onListRemove(id);
  }

  function itemErrorHandler(message: string) {
    setError(message);
  }

  function closeModalHandler() {
    setError("");
    setIsModalDisplayed(false);
  }

  return (
    <div className={styles.container}>
      {isModalDisplayed && !editingItem && !error && (
        <NewItemModal
          onItemAdd={addItemHandler}
          onClose={() => setIsModalDisplayed(false)}
          onItemError={itemErrorHandler}
        />
      )}

      {isModalDisplayed && editingItem && !error && (
        <NewItemModal
          editingItem={editingItem}
          onItemEdit={editItemHandler}
          onClose={() => setIsModalDisplayed(false)}
          onItemError={itemErrorHandler}
        />
      )}

      {error && (
        <Modal type="error" message={error} onClose={closeModalHandler} />
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
        {filteredItems.map((item) => {
          return (
            <li key={nanoid()}>
              <p>{item.name}</p>
              <span
                style={{ backgroundColor: item.category.backgroundColor }}
                className={`${styles.category}`}
              >
                {item.category.name}
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
