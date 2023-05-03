export type IItem = {
  [key: string]: string;
};

export type IResponse = {
  [key: string]: string | Record<string, unknown> | Array<IItem>;
  attributes: {
    [key: string]: IItem | any;
  };
};
