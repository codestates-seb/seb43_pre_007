export const mock = {
  user: {
    user_id: 1,
    display_name: '홍길동',
  },

  question: {
    question_id: 1,
    title: '질문제목',
    body: `# Programmatically navigate using React router

    \> UPDATE: 2022: React Router v6.6.1 with useNavigate
    
    The \`useHistory()\` hook is now deprecated. If you are using React Router 6, the proper way to navigate programmatically is as follows:
    
    \`\`\`js
    import { useNavigate } from "react-router-dom";
    
    function HomeButton() {
      const navigate = useNavigate();
    
      function handleClick() {
        navigate("/home");
      }
    
      return (
        <button type="button" onClick={handleClick}>
          Go home
        </button>
      );
    }
    \`\`\`
    
    > React Router v5.1.0 with hooks
    
    There is a new \`useHistory\` hook in React Router >5.1.0 if you are using React >16.8.0 and functional components.
    
    \`\`\`js
    import { useHistory } from "react-router-dom";
    
    function HomeButton() {
      const history = useHistory();
    
      function handleClick() {
        history.push("/home");
      }
    
      return (
        <button type="button" onClick={handleClick}>
          Go home
        </button>
      );
    }
    \`\`\`
    
    With v4 of React Router, there are three approaches that you can take to programmatic routing within components.
    
    - Use the withRouter higher-order component.
    - Use composition and render a <Route>
    - Use the context.
        
    React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.
    
    A history instance has two methods for navigating: push and replace. If you think of the history as an array of visited locations, push will add a new location to the array and replace will replace the current location in the array with the new one. Typically you will want to use the push method when you are navigating.
    
    In earlier versions of React Router, you had to create your own history instance, but in v4 the <BrowserRouter>, <HashRouter>, and <MemoryRouter> components will create a browser, hash, and memory instances for you. React Router makes the properties and methods of the history instance associated with your router available through the context, under the router object.
    
    `,
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

    tags: [
      { tag_id: 1, name: '태그이름1' },
      { tag_id: 2, name: '태그이름2' },
      { tag_id: 3, name: '태그이름3' },
      { tag_id: 4, name: '태그이름4' },
      { tag_id: 5, name: '태그이름5' },
    ],
  },

  answers: [
    {
      user: {
        user_id: 2,
        display_name: '고길동',
      },
      answer_id: 1,
      body: '답변내용은 20글자 이상이어야합니다.',
      is_accepted: false,
      creation_date: '2023-04-17T17:19:50.26007',
      last_edit_date: '2023-04-17T17:19:50.26007',
      is_vote: 0,
      score: 9,
    },
  ],
};
