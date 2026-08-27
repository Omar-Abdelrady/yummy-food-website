export interface VideoItem {
  id: string;
  title: string;
  source: string;
  thumbnail: string;
}

export interface RecipeVideoCard extends VideoItem {
  label: string;
  number: string;
  className: string;
}

export const recipeVideo: VideoItem = {
  id: "xlg-fWC3GzA",
  title: "Chinese Noodle Soup",
  source: "RecipeTin Eats",
  thumbnail: "https://i.ytimg.com/vi/xlg-fWC3GzA/hqdefault.jpg",
};

export const recipeVideoCards: RecipeVideoCard[] = [
  {
    ...recipeVideo,
    label: "Recipe watch",
    number: "01",
    className: "lg:col-span-7 lg:row-span-2",
  },
  {
    ...recipeVideo,
    label: "Broth & noodles",
    number: "02",
    className: "lg:col-span-5",
  },
  {
    ...recipeVideo,
    label: "A warm bowl",
    number: "03",
    className: "lg:col-span-5",
  },
  {
    ...recipeVideo,
    label: "Kitchen inspiration",
    number: "04",
    className: "lg:col-span-4",
  },
  {
    ...recipeVideo,
    label: "Made to share",
    number: "05",
    className: "lg:col-span-4",
  },
  {
    ...recipeVideo,
    label: "Watch again",
    number: "06",
    className: "lg:col-span-4",
  },
];
