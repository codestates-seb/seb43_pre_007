export type Question = {
  user: {
    user_id: number;
    display_name: string;
  };
  question: {
    question_id: number;
    title: string;
    body: string;
    is_answered: boolean;
    is_accepted: boolean;
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
  answers: Array<{
    user: {
      user_id: number;
      display_name: string;
    };
    answer_id: number;
    body: string;
    is_accepted: boolean;
    creation_date: string;
    last_edit_date: string;
    is_vote: number;
    score: number;
  }>;
};
