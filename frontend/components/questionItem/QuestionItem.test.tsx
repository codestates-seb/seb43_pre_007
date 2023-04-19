import { fireEvent, render } from '@testing-library/react';
import { QuestionItem, QuestionItemProps } from './QuestionItem';
import { useRouter } from 'next/router';

const mockData = {
  id: 'i123',
  title: 'How to add icons to React web',
  isVote: 101,
  isScore: 123,
  answerCount: -2,
  tags: [
    { id: '1', name: 'react' },
    { id: '2', name: 'javascript' },
  ],
  body: ` I have Googled this, but I keep finding different types of icons that refer to different things. How do I add these types of icons to the app?`,
  creationData: '2022-04-17T17:19:50.26007',
  userName: 'front-king',
};

describe('<QuestionItem />', () => {
  const cp = (props: QuestionItemProps) => {
    const { getByText, getByRole, getAllByLabelText } = render(
      <QuestionItem {...props} />
    );

    const title = getByRole('heading');
    const vote = getByText(/101/);
    const tags = getAllByLabelText(/tag/);
    const score = getByText(/123/);
    const answer = getByText(/-2/);
    const body = getByText(/I have Googled this/);
    const user = getByText(/front-king/);

    return { title, vote, tags, score, answer, body, user };
  };

  let handleClick: jest.Mock;

  beforeEach(() => {
    handleClick = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: handleClick,
    });
  });

  test('children 렌더링', () => {
    const { title, vote, score, tags, answer, body, user } = cp(mockData);

    expect(title).toBeInTheDocument();
    expect(vote).toBeInTheDocument();
    expect(score).toBeInTheDocument();
    expect(answer).toBeInTheDocument();
    expect(body).toBeInTheDocument();
    expect(user).toBeInTheDocument();

    tags.length && expect(tags.length).toBe(mockData.tags.length);
  });

  test('user 클릭시 route 이동', () => {
    const { user } = cp(mockData);
    fireEvent.click(user);
    expect(handleClick).toBeCalled();
  });

  test('tag 클릭시 route 이동', () => {
    const { tags } = cp(mockData);

    if (tags.length) {
      tags.forEach((tag) =>
        fireEvent.click(tag.querySelector(':first-child') as HTMLButtonElement)
      );
      expect(handleClick).toBeCalledTimes(mockData.tags.length);
    }
  });
});
