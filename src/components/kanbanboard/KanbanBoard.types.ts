export type Category = {
  id: string;
  name: string;
  backgroundColor: string;
};

export type ModifiedCategory = {
  id: string;
  name: string;
  backgroundColor: string;
  active: boolean;
};

export type ListItem = {
  id: string;
  name: string;
  description: string;
  category: Category;
};

export type List = {
  id: string;
  name: string;
  items: ListItem[];
};
