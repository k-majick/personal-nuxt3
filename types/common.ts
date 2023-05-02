export type IPost = {
  id: string;
  top: boolean;
  attributes: {
    Post: {
      date: string;
      imageUrl: string;
      lead: string;
      link: string;
      title: string;
    };
  };
};
