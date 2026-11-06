
export type Designer = {
    id: string;
    name: string;
    image: string;
    collection: string;
    bio: string;
    instagram?: string;
    looks: string[];
};

export const designers: Designer[] = [
    {
        id: "designer-1",
        name: "Designer Name",
        image: "/media/designers/designer-1.jpg",
        collection: "Collection Title",
        bio: "Designer biography and collection information.",
        instagram: "",
        looks: [
            "/media/designers/designer-1-look-1.jpg",
            "/media/designers/designer-1-look-2.jpg",
            "/media/designers/designer-1-look-3.jpg",
            "/media/designers/designer-1-look-4.jpg",
            "/media/designers/designer-1-look-5.jpg",
            "/media/designers/designer-1-look-6.jpg",
        ],
    },
    {
        id: "designer-2",
        name: "Designer Name",
        image: "/media/designers/designer-2.jpg",
        collection: "Collection Title",
        bio: "Designer biography and collection information.",
        instagram: "",
        looks: [
            "/media/designers/designer-2-look-1.jpg",
            "/media/designers/designer-2-look-2.jpg",
            "/media/designers/designer-2-look-3.jpg",
            "/media/designers/designer-2-look-4.jpg",
            "/media/designers/designer-2-look-5.jpg",
            "/media/designers/designer-2-look-6.jpg",
        ],
    },
    {
        id: "designer-3",
        name: "Designer Name",
        image: "/media/designers/designer-3.jpg",
        collection: "Collection Title",
        bio: "Designer biography and collection information.",
        instagram: "",
        looks: [
            "/media/designers/designer-3-look-1.jpg",
            "/media/designers/designer-3-look-2.jpg",
            "/media/designers/designer-3-look-3.jpg",
            "/media/designers/designer-3-look-4.jpg",
            "/media/designers/designer-3-look-5.jpg",
            "/media/designers/designer-3-look-6.jpg",
        ],
    },
];

