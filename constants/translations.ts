export interface Translation {
  [key: string]: string | Translation
}

export const translations: Translation = {
  app: {
    title: 'Sabbath School',
    // TODO: Add description and keywords
    description: 'Sabbath School Lessons',
    keywords: 'Sabbath School Lessons, Adventist',

    all: 'See All',
    back: 'Go Back',
    more: 'More',
    read: 'Read',
    introducation: 'Introducation',
    uncategorized: 'uncategorized',
  },

  home: {
    index: 'Home',
  },

  language: {
    index: 'Languages',
    search: 'Search for a language',
  },

  login: {
    index: 'Login',
    anonymous: 'Anonymous',
  },

  error: {
    404: {
      title: 'Page Not Found',
      message: 'The page you are looking for does not exist.',
    },
  },
}
