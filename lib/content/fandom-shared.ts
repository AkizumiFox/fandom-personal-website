export type FandomCategory = "commission" | "ocs" | "fursuit" | "stickers" | "model3d";

export type FandomItem = {
  id: string;
  title: string;
  category: FandomCategory;
  description: string;
  author: string;
  authorUrl: string;
  image: string;
};

export const fandomCategoryLabels: Record<FandomCategory, string> = {
  commission: "獸圖",
  ocs: "獸設",
  fursuit: "毛裝",
  stickers: "TG貼圖",
  model3d: "3D模型"
};
