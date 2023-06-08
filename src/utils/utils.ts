import { nanoid } from "nanoid";

export function capitalize(word: string) {
  return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
}

export function changeCategoryIntoObject(
  name: string,
  backgroundColor: string
) {
  return { id: nanoid(), name: name, backgroundColor: backgroundColor };
}
