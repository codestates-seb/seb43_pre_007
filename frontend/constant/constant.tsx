import Link from 'next/link';

export const publicLi = ['Questions', 'Tags', 'Users', 'Companies'];

export const nonContainerRoutes = [
  '/users/signup',
  '/users/login',
  '/users/logout',
  '/questions/ask',
];

export const detailNav = ['Profile', 'Activity', 'Saves'];

export const detailActivityContent: { [key: string]: JSX.Element } = {
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

export const detailSaves = ['All saves', 'For later'];

export const footerNav: {
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

export const footerSocial = [
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

export const daysFilter = ['week', 'month', 'quarter', 'year', 'all'];
