type CategoryType = {
  id: number;
  name: string;
};

// shop 페이지 카테고리 포멧팅
const categoryArray: CategoryType[] = [
  { id: 1, name: "event" },
  { id: 2, name: "present" },
  { id: 3, name: "interior" },
  { id: 4, name: "rank" },
  { id: 5, name: "recommand" },
  { id: 6, name: "plant&wreath" },
  { id: 7, name: "flowerpotMaterials" },
  { id: 8, name: "gardeningMaterials" },
];

const category: { [key: number]: string } = categoryArray.reduce(
  (acc, item) => {
    acc[item.id] = item.name;
    return acc;
  },
  {} as { [key: number]: string }
);

export const tabNumberToCategory = (number: number): string => {
  return category[number];
};

// community 페이지 카테고리 포멧팅
const communityCategoryArray: CategoryType[] = [
  { id: 1, name: "chat" },
  { id: 2, name: "event" },
  { id: 3, name: "question" },
  { id: 4, name: "sharing" },
  { id: 5, name: "information" },
  { id: 6, name: "others" },
];

const communityCategory: { [key: number]: string } =
  communityCategoryArray.reduce((acc, item) => {
    acc[item.id] = item.name;
    return acc;
  }, {} as { [key: number]: string });

export const tabNumberToCommunityCategory = (tab: number): string => {
  if (tab === null) {
    return "all";
  }
  return communityCategory[tab];
};
