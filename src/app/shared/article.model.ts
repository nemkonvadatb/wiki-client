export interface Article {
  _id?: string;
  //lang?: string[];
  lang_id?: string[];
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

