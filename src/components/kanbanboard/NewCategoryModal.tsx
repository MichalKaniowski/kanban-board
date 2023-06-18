import { nanoid } from "nanoid";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { CirclePicker } from "react-color";
import { useState, useRef, useContext } from "react";
import Backdrop from "../ui/Backdrop";
import styles from "./NewCategoryModal.module.css";
import { KanbanContext } from "../../store/KanbanContext";
import Modal from "../ui/Modal";

export default function NewCategoryModal({ onClose }: { onClose: () => void }) {
  const [color, setColor] = useState("green");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null!);
  const kanbanContext = useContext(KanbanContext);

  function colorChangeHandler(color: string) {
    setColor(color);
  }

  function categoryAddHandler() {
    if (kanbanContext.categories.length >= 20) {
      setError("You can't have more than 20 categories.");
      return;
    }

    const name = inputRef.current.value;
    const namesOfCategories = kanbanContext.categories.map(
      (category) => category.name
    );

    if (name === "") {
      setError(
        "You haven't specified name of the category, so category wasn't saved."
      );
      return;
    }

    if (namesOfCategories.includes(name)) {
      setError("Category with this name was already created.");
      return;
    }

    kanbanContext.onCategoryAdd({
      id: nanoid(),
      name: name,
      backgroundColor: color,
      active: true,
    });
    onClose();
  }

  const modal = (
    <>
      <Backdrop onClose={onClose} />
      <div className={`modal ${styles.modal}`}>
        <h3>New Category</h3>
        <input ref={inputRef} placeholder="Category name: " />
        <CirclePicker
          circleSize={23}
          onChange={(e) => colorChangeHandler(e.hex)}
        />
        <div className={styles["add-category-button-container"]}>
          <button
            onClick={categoryAddHandler}
            className={styles["add-category-button"]}
          >
            Add
          </button>
        </div>
        <button className={styles["close-modal-button"]} onClick={onClose}>
          <FontAwesomeIcon icon={faX} size="sm" />
        </button>
      </div>
    </>
  );

  const rootOverlay = document.querySelector("#root-overlay") as Element;

  return error ? (
    <Modal type="error" message={error} onClose={onClose} />
  ) : (
    ReactDOM.createPortal(modal, rootOverlay)
  );
}
