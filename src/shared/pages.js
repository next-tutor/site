export const SITE_NAME = 'Next Tutor';

/** @param {string | null | undefined} pageName */
export function formatPageTitle(pageName) {
  if (!pageName) return SITE_NAME;
  return `${SITE_NAME}: ${pageName}`;
}

export const pages = {
  home: {
    path: 'src/pages/home/index.html',
    url: '/',
    title: null,
  },
  platform: {
    path: 'src/pages/platform/index.html',
    url: '/platform',
    title: 'Platform',
  },
  pricing: {
    path: 'src/pages/pricing/index.html',
    url: '/pricing',
    title: 'Pricing',
  },
  about: {
    path: 'src/pages/about/index.html',
    url: '/about',
    title: 'About',
  },
  contact: {
    path: 'src/pages/contact/index.html',
    url: '/contact',
    title: 'Contact',
  },
  'features-website': {
    path: 'src/pages/features/website/index.html',
    url: '/features/website',
    title: 'Web Studio',
  },
  'features-reports': {
    path: 'src/pages/features/reports/index.html',
    url: '/features/reports',
    title: 'Incomes',
  },
  'features-students': {
    path: 'src/pages/features/students/index.html',
    url: '/features/students',
    title: 'Student Portal',
  },
  'features-tasks': {
    path: 'src/pages/features/tasks/index.html',
    url: '/features/tasks',
    title: 'Tasks',
  },
  'features-automation': {
    path: 'src/pages/features/automation/index.html',
    url: '/features/automation',
    title: 'Automation',
  },
  privacy: {
    path: 'src/pages/legal/privacy/index.html',
    url: '/privacy',
    title: 'Privacy Policy',
  },
  terms: {
    path: 'src/pages/legal/terms/index.html',
    url: '/terms',
    title: 'Terms of Service',
  },
  credits: {
    path: 'src/pages/legal/credits/index.html',
    url: '/credits',
    title: 'Credits',
  },
};
