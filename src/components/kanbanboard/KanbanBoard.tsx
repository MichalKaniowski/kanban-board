import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import styles from "./KanbanBoard.module.css";
import KanbanList from "./KanbanList";
import NewKanbanList from "./NewKanbanList";
import { KanbanContext } from "../../store/KanbanContext";

type Props = {
  onThemeChange: (themeIsDark: boolean) => void;
  themeIsDark: boolean;
};

export default function KanbanBoard({ onThemeChange, themeIsDark }: Props) {
  const kanbanContext = useContext(KanbanContext);
  const initialCategories = kanbanContext.categories.map((category) => ({
    ...category,
    active: true,
  }));
  const [categories, setCategories] = useState(initialCategories);
  const [inputValue, setInputValue] = useState("");

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
    const listsLength = listsContainer.children.length;
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

  function themeChangeHandler(theme: string) {
    if (theme === "light") {
      onThemeChange(false);
    } else {
      onThemeChange(true);
    }
  }

  function toggleCategoryHandler(categoryId: string) {
    setCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id === categoryId) {
          return { ...category, active: !category.active };
        } else {
          return category;
        }
      })
    );
  }

  const categorieElements = categories.map((category) => {
    return (
      <div
        key={nanoid()}
        onClick={() => toggleCategoryHandler(category.id)}
        className={`${styles.category} ${category.active ? styles.active : ""}`}
        style={{ backgroundColor: category.backgroundColor }}
      >
        {category.name}
      </div>
    );
  });

  return (
    <div className={styles["kanban-board"]}>
      <div className={styles["top-container"]}>
        <h1 className={styles["main-heading"]}>Kanban</h1>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          placeholder="Search for task"
        />
        <button
          className={`${styles["theme-button"]} ${
            themeIsDark ? styles["dark-theme"] : styles["light-theme"]
          }`}
        >
          <FontAwesomeIcon
            onClick={() => themeChangeHandler("light")}
            className={styles.sun}
            icon={faSun}
            size="lg"
          />

          <FontAwesomeIcon
            onClick={() => themeChangeHandler("dark")}
            className={styles.moon}
            icon={faMoon}
            size="lg"
          />
          <div className={styles.ball}></div>
        </button>
      </div>

      <div className={styles.categories}>{categorieElements}</div>

      <div className={styles.row}>
        <div id="lists-container" className={styles["lists-container"]}>
          {lists.map((list) => (
            <KanbanList
              key={list.id}
              id={list.id}
              name={list.name}
              items={list.items}
              categories={categories}
              inputValue={inputValue}
            />
          ))}
        </div>
        <NewKanbanList onAdd={addListHandler} />
      </div>
    </div>
  );
}
