export type ListItem = {
  id: string;
  name: string;
  description: string;
  category: string;
};

export type List = {
  id: string;
  name: string;
  items: ListItem[];
};
