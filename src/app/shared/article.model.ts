export interface Article {
  _id?: string;
  lang?: string[];
  author_id?: string;
}

export interface ArticleDetails {
  _id?: string;
  article_id?: string;
  lang_id?: string;
  context?: string;
  title?: string;
  lang?: string[];
}

export interface ArticleDetailsHistory {
  _id?: string;
  article_id?: string;
  context?: string;
  title?: string;
  lang_id?: string;
  state?: string;
  reviewer_id?: string;
  author_id?: string;
}

export const MOCK_ARTICLE_DETAILS: ArticleDetails[] = [
  {
    _id: 'asd',
    article_id: 'asdasd',
    lang_id: 'hu',
    context:
      'context1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
    title: 'title1',
  },
  {
    _id: 'asdqwe',
    article_id: 'asdasdqwe',
    lang_id: 'hu',
    context:
      'context2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
    title: 'title2',
  },
];

export const MOCK_ARTICLES: Article[] = [
  {
    _id: 'mkomomk',
    lang: ['hu', 'en', 'de'],
    author_id: 'mmmmmm',
  },
];

export const MOCK_ARTICLE_DETAILS_HISTORY = {
  _id: 'asdasd',
  context:
    'article history 1 "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboru',
  title: 'article history 1',
  article_id: 'asdasd',
  lang_id: 'hu',
  state: 'underConsideration',
  reviewer_id: null,
  author_id: 'qweqwe',
};
