import { nanoid } from "nanoid";
import styles from "./NewItemModal.module.css";
import ReactDOM from "react-dom";
import { useState, useRef, useEffect } from "react";
import { ListItem } from "./KanbanBoard.types";
import Backdrop from "../ui/Backdrop";
import { changeCategoryIntoObject } from "../../utils/utils";

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

const categories = ["feature", "refactor", "bug", "other"];

export default function NewItemModal(props: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null!);
  const textAreaRef = useRef<HTMLTextAreaElement>(null!);

  const editingItem = (props as EditItem).editingItem;
  const isEditing = editingItem !== undefined;

  useEffect(() => {
    if (isEditing) {
      inputRef.current.value = editingItem.name;
      textAreaRef.current.value = editingItem.description;
      setActiveCategory(editingItem.category.name);
    }
  }, [isEditing]);

  function categoryChangeHandler(e: React.MouseEvent<HTMLUListElement>) {
    const element = e.target as HTMLUListElement;
    const elementCategory = element.dataset.category as string;

    setActiveCategory(elementCategory);
  }

  function addItemHandler() {
    const title = inputRef.current.value;
    const description = textAreaRef.current.value;

    if (title.trim() === "") {
      props.onItemError("Title wasn't provided, so the task wasn't saved.");
      props.onClose();
      return;
    }

    (props as AddItem).onItemAdd({
      id: nanoid(),
      name: title,
      description: description,
      category: activeCategory
        ? changeCategoryIntoObject(activeCategory, "yellow")
        : changeCategoryIntoObject("other", "yellow"),
    });
  }

  function editItemHandler() {
    const title = inputRef.current.value;
    const description = textAreaRef.current.value;

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
      category: changeCategoryIntoObject(activeCategory, "yellow"),
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
    <div className={`modal ${styles.modal}`}>
      <h3 className="modal-heading">{modalHeading}</h3>
      <button className={styles["close-modal-button"]} onClick={props.onClose}>
        X
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
          cols={35}
        />
        <button type="submit" className={styles["add-task-button"]}>
          Save
        </button>
      </form>

      <p className={styles["task-category-heading"]}>Task category</p>
      <ul className={styles.categories} onClick={categoryChangeHandler}>
        {categories.map((category) => (
          <li
            key={nanoid()}
            data-category={category}
            className={`${styles[category]} ${
              activeCategory === category ? `${styles["active-category"]}` : ""
            }`}
          >
            {category}
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
