import React, { useState } from "react";
import { List, ListItem } from "../components/kanbanboard/KanbanBoard.types";

type Props = {
  children: React.ReactNode;
};

type Context = {
  lists: List[];
  onListAdd: (list: List) => void;
  onItemAdd: (listId: string, item: ListItem) => void;
  onItemEdit: (listId: string, item: ListItem) => void;
  onListRemove: (listId: string) => void;
};

export const KanbanContext = React.createContext<Context>({
  lists: [],
  onListAdd: () => {},
  onItemAdd: () => {},
  onItemEdit: () => {},
  onListRemove: () => {},
});

const initialLists = [
  {
    id: "hWAF2KkzrbpOSA8COYDEa",
    name: "Agenda",
    items: [
      {
        id: "DUW9g1bhYDyrUWvBO7G1o",
        name: "Task 1",
        description: "Description to first task",
        category: "feature",
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
        category: "bug",
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

  function addList(list: List) {
    setLists((prevLists) => [...prevLists, list]);
  }

  function addItem(listId: string, item: ListItem) {
    setLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id === listId) {
          const newListItems = [...list.items, item]; //create deep copy
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
      category: item.category.toLowerCase(),
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
