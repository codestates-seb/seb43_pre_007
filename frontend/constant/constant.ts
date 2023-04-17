export const publicLi = ['Questions', 'Tags', 'Users', 'Companies'];

export const nonContainerRoutes = [
  '/users/signup',
  '/users/login',
  '/questions/ask',
];

export const detailNav = ['Profile', 'Activity', 'Saves'];

export const detailActivity = [
  'Summary',
  'Answers',
  'Questions',
  'Tags',
  'Articles',
  'Badges',
  'Following',
  'Bounties',
  'Reputation',
  'Votes',
];

export const detailActivityContent: { [key: string]: string } = {
  Answers: 'You have not answered any questions',
  Questions: 'You have not asked any questions',
  Tags: 'You have not participated in any tags',
  Articles: 'You have not created any articles.',
  Badges: 'You have not earned any badges',
  Following: 'You are not following any posts.',
  Bounties: 'You have no active bounties',
  Reputation: 'You have no recent reputation changes.',
  Votes: 'You have not cast any votes',
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
  'Blog',
  'Facebook',
  'Twitter',
  'LinkdIn',
  'Instagram',
];
