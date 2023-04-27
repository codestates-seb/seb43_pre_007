export type User = {
  user_id: string;
  display_name: string;
  about_me: string;
  location: string;
  creation_date: Date;
  question_count: number;
  answer_count: number;
  tags: Tags[];
  image_url: string;
};

export type PageInfo = {
  page: number;
  size: number;
  total_elements: number;
  total_pages: number;
};

export type Tags = {
  tag_id: number;
  name: string;
  info: string;
  question_amount: number;
};

export type UserData = {
  access_token?: string;
  display_name: string;
  image?: string;
  refresh_token?: string;
  user_id: number;
};
