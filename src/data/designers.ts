
export type Designer = {
  id: string;
  name: string;
  image: string;
  collection: string;
  bio: string;
  instagram?: string;
};

export const designers: Designer[] = [
  {
    id: "designer-1",
    name: "Designer Name",
    image: "/media/designers/designer-1.jpg",
    collection: "Collection Title",
    bio: "Designer biography/collection information.",
    instagram: "",
  },
  {
    id: "designer-2",
    name: "Designer Name",
    image: "/media/designers/designer-2.jpg",
    collection: "Collection Title",
    bio: "Designer biography/collection information.",
    instagram: "",
  },
  {
    id: "designer-3",
    name: "Designer Name",
    image: "/media/designers/designer-3.jpg",
    collection: "Collection Title",
    bio: "Designer biography/collection information.",
    instagram: "",
  },
];
