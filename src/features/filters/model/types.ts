export type TCategoriesSelected = {
  [key: number]: string[];
};

export type TFilterValues = {
  offerType: string;
  categories: TCategoriesSelected;
  gender: string;
  cities: string[];
};
