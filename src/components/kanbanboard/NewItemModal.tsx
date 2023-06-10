import { nanoid } from "nanoid";
import styles from "./NewItemModal.module.css";
import ReactDOM from "react-dom";
import { useState, useRef, useEffect, useContext } from "react";
import { Category, ListItem } from "./KanbanBoard.types";
import Backdrop from "../ui/Backdrop";
import { changeCategoryIntoObject } from "../../utils/utils";
import { KanbanContext } from "../../store/KanbanContext";
import { ScreenContext } from "../../store/ScreenContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

type AddItem = {
  onItemAdd: ({ id, name, description, category }: ListItem) => void;
  onClose: () => void;
  onItemError: (message: string) => void;
};

type EditItem = {
  editingItem: ListItem;
  onItemEdit: ({ id, name, description, category }: ListItem) => void;
  onClose: () => void;
  onItemError: (message: string) => void;
};

type Props = AddItem | EditItem;

export default function NewItemModal(props: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null!);
  const textAreaRef = useRef<HTMLTextAreaElement>(null!);
  const kanbanContext = useContext(KanbanContext);
  const screenContext = useContext(ScreenContext);

  const categories = kanbanContext.categories;

  const editingItem = (props as EditItem).editingItem;
  const isEditing = editingItem !== undefined;

  useEffect(() => {
    if (isEditing) {
      inputRef.current.value = editingItem.name;
      textAreaRef.current.value = editingItem.description;
      setActiveCategory(editingItem.category.name);
    }
  }, [isEditing]);

  function categoryChangeHandler(categoryId: string) {
    const category = categories.find(
      (category) => category.id === categoryId
    ) as Category;

    setActiveCategory(category.name);
  }

  function addItemHandler() {
    const title = inputRef.current.value;
    const description = textAreaRef.current.value;

    if (title.trim() === "") {
      props.onItemError("Title wasn't provided, so the task wasn't saved.");
      props.onClose();
      return;
    }

    const category = categories.find(
      (category) => category.name === activeCategory
    ) as Category;

    (props as AddItem).onItemAdd({
      id: nanoid(),
      name: title,
      description: description,
      category: activeCategory
        ? changeCategoryIntoObject(activeCategory, category.backgroundColor)
        : changeCategoryIntoObject("other", "rgb(155, 155, 0)"),
    });
  }

  function editItemHandler() {
    const title = inputRef.current.value;
    const description = textAreaRef.current.value;

    const category = categories.find(
      (category) => category.name === activeCategory
    ) as Category;

    if (title.trim() === "") {
      props.onItemError(
        "Title wasn't provided, so the new value wasn't saved."
      );
      props.onClose();
      return;
    }

    (props as EditItem).onItemEdit({
      id: editingItem.id,
      name: title,
      description: description,
      category: changeCategoryIntoObject(
        activeCategory,
        category.backgroundColor
      ),
    });
  }

  function formSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isEditing) {
      editItemHandler();
    } else {
      addItemHandler();
    }
  }

  const modalHeading = isEditing ? "Edit Task" : "Create new task";

  const newItemModal = (
    <div
      className={`modal ${styles.modal} ${
        screenContext.isScreenSmall ? styles["small-screen"] : ""
      }`}
    >
      <h3 className="modal-heading">{modalHeading}</h3>
      <button className={styles["close-modal-button"]} onClick={props.onClose}>
        <FontAwesomeIcon icon={faX} size="sm" />
      </button>
      <form onSubmit={formSubmitHandler}>
        <label htmlFor="title-input">Title</label>
        <input id="title-input" ref={inputRef} placeholder="Task title" />

        <label htmlFor="description-input">Description</label>
        <textarea
          id="description-input"
          ref={textAreaRef}
          placeholder="Task description"
          rows={5}
        />
        <button type="submit" className={styles["add-task-button"]}>
          Save
        </button>
      </form>

      <p className={styles["task-category-heading"]}>Task category</p>
      <ul className={styles.categories}>
        {categories.map((category) => (
          <li
            key={nanoid()}
            onClick={() => categoryChangeHandler(category.id)}
            style={{ backgroundColor: category.backgroundColor }}
            className={`${
              activeCategory === category.name
                ? ""
                : `${styles["not-active-category"]}`
            }`}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );

  const modal = (
    <>
      <Backdrop onClose={props.onClose} />
      {newItemModal}
    </>
  );

  const rootOverlay = document.querySelector("#root-overlay") as Element;

  return ReactDOM.createPortal(modal, rootOverlay);
}
