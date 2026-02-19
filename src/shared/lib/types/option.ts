export type Option = {
  value: string;
  label: string;
};

// без этого типа поля констант становятся readonly и их не принимают компоненты-атомы
