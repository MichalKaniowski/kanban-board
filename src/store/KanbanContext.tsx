import React, { useState } from "react";
import {
  List,
  ListItem,
  Category,
} from "../components/kanbanboard/KanbanBoard.types";
import { changeCategoryIntoObject } from "../utils/utils";

type Props = {
  children: React.ReactNode;
};

type Context = {
  lists: List[];
  categories: Category[];
  onListAdd: (list: List) => void;
  onItemAdd: (listId: string, item: ListItem) => void;
  onItemEdit: (listId: string, item: ListItem) => void;
  onListRemove: (listId: string) => void;
};

export const KanbanContext = React.createContext<Context>({
  lists: [],
  categories: [],
  onListAdd: () => {},
  onItemAdd: () => {},
  onItemEdit: () => {},
  onListRemove: () => {},
});

const initialLists: List[] = [
  {
    id: "hWAF2KkzrbpOSA8COYDEa",
    name: "Agenda",
    items: [
      {
        id: "DUW9g1bhYDyrUWvBO7G1o",
        name: "Task 1",
        description: "Description to first task",
        category: changeCategoryIntoObject("feature", "green"),
      },
    ],
  },
  {
    id: "teG1cZy7n3XfWWieUmnAF",
    name: "To do",
    items: [
      {
        id: "wkYl5i0sUa1EavGn04EMr",
        name: "Task 2",
        description: "Description to second task",
        category: changeCategoryIntoObject("bug", "purple"),
      },
    ],
  },
  {
    id: "LzIDAgjP8mqpNLljKbqCd",
    name: "Doing",
    items: [],
  },
  {
    id: "wXx7-xzTVC9qV3r-KyhGS",
    name: "Done",
    items: [],
  },
];

export function KanbanContextProvider(props: Props) {
  const [lists, setLists] = useState(initialLists);
  const [categories] = useState([
    { id: "bJTAesd5EJNhNoE6_vpwE", name: "feature", backgroundColor: "green" },
    {
      id: "jY6JvfkfjfwQUnio3gpYj",
      name: "refactor",
      backgroundColor: "rgb(106, 106, 255)",
    },
    { id: "QbUIbBD7lnKXXrYrEIS4J", name: "bug", backgroundColor: "purple" },
    {
      id: "86idew7Sduc6zM94NBIun",
      name: "other",
      backgroundColor: "rgb(155, 155, 0)",
    },
  ]);

  function addList(list: List) {
    setLists((prevLists) => [...prevLists, list]);
  }

  function addItem(listId: string, item: ListItem) {
    setLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id === listId) {
          console.log(list.items);
          const newListItems = [...list.items, item];
          return { ...list, items: newListItems };
        } else {
          return list;
        }
      })
    );
  }

  function editItem(listId: string, item: ListItem) {
    const list = lists.find((list) => list.id === listId) as List;
    const listItem = list.items.find(
      (listItem) => listItem.id === item.id
    ) as ListItem;

    const newListItem = {
      id: listItem.id,
      name: item.name,
      description: item.description,
      category: {
        id: item.category.id,
        name: item.category.name,
        backgroundColor: item.category.backgroundColor,
      },
    };

    setLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id == listId) {
          const newItems = list.items.map((listItem) => {
            if (listItem.id === item.id) {
              return newListItem;
            } else {
              return listItem;
            }
          });
          return { ...list, items: newItems };
        } else {
          return list;
        }
      })
    );
  }

  function removeList(listId: string) {
    setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
  }

  const value = {
    lists: lists,
    categories: categories,
    onListAdd: addList,
    onItemAdd: addItem,
    onItemEdit: editItem,
    onListRemove: removeList,
  };

  return (
    <KanbanContext.Provider value={value}>
      {props.children}
    </KanbanContext.Provider>
  );
}
