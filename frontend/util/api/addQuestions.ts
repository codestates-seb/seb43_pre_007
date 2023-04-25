export type ReqAddQuestion = {
  title: string;
  body: string;
  tags: Array<{ tag_id: number; name: string }>;
};

export type ResQuestion = {
  user: {
    user_id: number;
    display_name: string;
  };
  question: {
    question_id: number;
    title: string;
    body: string;
    is_answered: false;
    is_accepted: false;
    view_count: number;
    answer_count: number;
    creation_date: string;
    last_edit_date: string;
    vote: {
      is_vote: number;
      down_vote_count: number;
      up_vote_count: number;
      score: number;
    };
    tags: Array<{ tag_id: number; name: string }>;
  };
};

export type ReqUpdateQuestion = {
  title: string;
  body: string;
  tags: Array<{ tag_id: number; name: string }>;
};
