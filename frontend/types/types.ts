type User = {
  user_id: string;
  display_name: string;
  about_me: string;
  location: string;
  creation_date: Date;
  question_count: number;
  answer_count: number;
  tags: Tags[];
};

type PageInfo = {
  page: number;
  size: number;
  total_elements: number;
  total_pages: number;
};

type Tags = {
  tag_id: number;
  name: string;
};

type Users = {
  data: User;
};
