export type ResQuestion = {
  page_info: {
    page: number;
    size: number;
    total_elements: number;
    total_pages: number;
  };
  data: Array<{
    user: {
      user_id: number;
      display_name: string;
    };
    question: {
      question_id: string;
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

      tags: Array<{ tag_id: string; name: string }>;
    };
  }>;
};
