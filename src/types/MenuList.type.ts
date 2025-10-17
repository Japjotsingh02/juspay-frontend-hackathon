export type MenuListType = {
  id: number;
  name: string;
  icon: React.ReactElement;
  subTitle?: string;
  children?: MenuListType[];
};
