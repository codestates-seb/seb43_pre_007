import { tokenLocalStorage } from '@/util/local_storage/localStorage';
import Link from 'next/link';

export const PUBLIC_LI = ['Questions', 'Tags', 'Users', 'Companies'];

export const NON_CONTAINER_ROUTES = [
  '/users/signup',
  '/users/login',
  '/users/logout',
  '/questions/ask',
];

export const DETAIL_NAV = ['Profile', 'Activity'];

export const DETAIL_ACTIVITY_CONTENT: { [key: string]: JSX.Element } = {
  Answers: (
    <span>
      You have not <a>answered</a> any questions
    </span>
  ),
  Questions: (
    <span>
      You have not <a>asked</a> any questions
    </span>
  ),
  Tags: (
    <span>
      You have not participated in any <Link href="/tags">tags</Link>
    </span>
  ),
  Articles: (
    <span>
      You have not created any <a>articles</a>
    </span>
  ),
  Badges: (
    <span>
      You have not earned any <a>badges</a>
    </span>
  ),
  Following: (
    <span>
      You are not <a>following any posts</a>
    </span>
  ),
  Bounties: (
    <span>
      You have no active <a>bounties</a>
    </span>
  ),
  Reputation: (
    <span>
      You have no recent <a>reputation changes</a>
    </span>
  ),
  Votes: (
    <span>
      You have not cast any <a>votes</a>
    </span>
  ),
};

export const DETAIL_SAVES = ['All saves', 'For later'];

export const FOOTER_NAV: {
  [key: string]: string[];
}[] = [
  { ['STACK OVERFLOW']: ['Questions', 'Help'] },
  { ['PRODUCTS']: ['Teams', 'Advertising', 'Collectives', 'Talent'] },
  {
    ['COMPANY']: [
      'About',
      'Press',
      'Work Here',
      'Legal',
      'Privacy Policy',
      'Terms of Service',
      'Contact Us',
      'Cookie Setting',
      'Cookie Policy',
    ],
  },
  {
    ['STACK EXCHANGE NETWORK']: [
      'Technology',
      'Culture & recreation',
      'Life & arts',
      'Science',
      'Professional',
      'Business',
    ],
  },
];

export const FOOTER_SOCIAL = [
  <a key={0}>Blog</a>,
  <a key={1} href={'https://ko-kr.facebook.com/'} target="_blank">
    Facebook
  </a>,
  <a key={2} href={'https://twitter.com/?lang=ko'} target="_blank">
    Twitter
  </a>,
  <a key={3} href={'https://kr.linkedin.com/'} target="_blank">
    LinkdIn
  </a>,
  <a key={4} href={'https://www.instagram.com/'} target="_blank">
    Instagram
  </a>,
];

export const DAYS_FILTER = ['week', 'month', 'quarter', 'year', 'all'];

export const INIT_FILTER = { FILTER: 'Newest', PER_PAGE: 10, PAGE: 1 };

export const QUESTION_PER_PAGE_LIST = [10, 20, 30];

export const QUESTION_FILTER_LIST = ['Newest', 'Active', 'Boundtied'];

export const USER_EDIT_INPUT: {
  [key: string]: string;
} = {
  display_name: 'Display Name',
  location: 'Location',
  title: 'Title',
  about_me: 'About me',
};

export const USER_EDIT_LINKS: {
  [key: string]: string;
} = {
  website: 'Website link',
  twitter: 'Twitter link or username',
  github: 'GitHub link or username',
};

export const USER_EDIT_LINKS_ICON = [
  <svg key={'link'} width="18" height="18" viewBox="0 0 18 18">
    <path d="M7.22 11.83a6 6 0 0 0 1.62.85l.61-1.8a4.1 4.1 0 1 1 4.04-.8l1.26 1.42a6 6 0 1 0-7.53.33Zm3.43-5.6a6 6 0 0 0-1.6-.87L8.4 7.15a4.1 4.1 0 1 1-4.05.73L3.12 6.43a6 6 0 1 0 7.53-.2Z"></path>
  </svg>,
  <svg key={'twitter'} width="18" height="18" viewBox="0 0 18 18">
    <path
      fill="#2AA3EF"
      d="M17 4.04c-.59.26-1.22.44-1.88.52a3.3 3.3 0 0 0 1.44-1.82c-.64.37-1.34.64-2.09.79a3.28 3.28 0 0 0-5.6 2.99A9.3 9.3 0 0 1 2.12 3.1a3.28 3.28 0 0 0 1.02 4.38 3.28 3.28 0 0 1-1.49-.4v.03a3.29 3.29 0 0 0 2.64 3.22 3.34 3.34 0 0 1-1.48.06 3.29 3.29 0 0 0 3.07 2.28 6.58 6.58 0 0 1-4.85 1.36 9.33 9.33 0 0 0 5.04 1.47c6.04 0 9.34-5 9.34-9.33v-.42a6.63 6.63 0 0 0 1.63-1.7L17 4.04Z"
    ></path>
  </svg>,
  <svg key={'github'} width="18" height="18" viewBox="0 0 18 18">
    <path
      fill="#010101"
      d="M9 1a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38l-.01-1.49c-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 9 1Z"
    ></path>
  </svg>,
];

export const DEFAULT_IMG =
  'https://www.gravatar.com/avatar/fa28bb5d084ba33bf405fbd8b3b1349b?s=48&d=identicon&r=PG&f=y&so-version=2';
export const DEFAULT_IMG2 =
  'https://www.gravatar.com/avatar/fa28bb5d084ba33bf405fbd8b3b1349b?s=256&d=identicon&r=PG&f=y&so-version=2';
