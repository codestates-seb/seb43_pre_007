export const questions = (page: any, size: any) => {
  const originList = [...getQuestions()];
  const sliceList = [];

  while (originList.length) {
    sliceList.push(originList.splice(0, size));
  }

  return {
    page_info: {
      page: page,
      size: size,
      total_elements: getQuestions().length,
      total_pages: sliceList.length,
    },
    data: sliceList[page],
  };
};

function getQuestions() {
  return [
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
    {
      user: {
        user_id: 1,
        display_name: 'Dimitri',
      },
      question: {
        question_id: 1,
        title: 'cache empty after adding PWA to home screen on Safari iOS',
        body: `Im building a PWA with VueJS in combination with Ionic. I've also installed the @vue/cli-plugin-pwa.
What I'm trying to achieve is storing an url param in cache with the cache API when a user visits`,
        is_answered: false,
        is_accepted: false,
        view_count: 16,
        answer_count: 3,
        creation_date: '2023-04-17T17:19:50.26007',
        last_edit_date: '2023-04-17T17:19:50.26007',
        vote: {
          is_vote: 0,
          down_vote_count: 1,
          up_vote_count: 10,
          score: 9,
        },

        tags: [{ tag_id: 1, name: '태그이름1' }],
      },
    },
  ];
}
