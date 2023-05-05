export const navItems = [
  { url: '/', text: 'Dashboard', dropdownItems: [] },
  {
    url: '/',
    text: 'Training',
    dropdownItems: [
      { text: 'Courses', url: '/' },
      { text: 'Learning Paths', url: '/' }
    ]
  },
  {
    url: '/',
    text: 'Training Elements',
    dropdownItems: [
      { text: 'Materials', url: '/element/material' },
      { text: 'Studio', url: '/' },
      { text: 'Assessments', url: '/' },
      { text: 'Checklists', url: '/' },
      { text: 'Knowledge Checks', url: '/' },
      { text: 'Instructor-Led Training', url: '/' }
    ]
  },
  {
    url: '/',
    text: 'Users and Groups',
    dropdownItems: [
      { text: 'Users', url: '/' },
      { text: 'Groups', url: '/' },
      { text: 'Permission and Roles', url: '/' }
    ]
  },
  {
    url: '/',
    text: 'Reporting',
    dropdownItems: [
      { text: 'Dashboard', url: '/' },
      { text: 'Reporting Wizard', url: '/' },
      { text: 'Report Builder', url: '/' },
      { text: 'Advanced Reports', url: '/' }
    ]
  }
];
export const dropdownItems = [
  { text: 'Profile', url: '/profile' },
  { text: 'Settings', url: '/settings' }
];
