import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import {
  Article,
  ArticleDetails,
  ArticleDetailsHistory,
} from '../shared/article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) { }

  /** @returns article_details[] */
  getAll(): Observable<ArticleDetails[]> {
    return this.http.get('articles/getAllArticleDetails').pipe(
      map((res) => res as ArticleDetails[])
    );
  }

  /** @returns article */
  getById(id: string): Observable<Article> {
    return this.http
      .get('articles/getArticleById/' + id)
      .pipe(map((res) => res as Article));
  }

  /** @returns article_details */
  getByIdAndLang(id: string, lang: string): Observable<ArticleDetails> {
    /* const params = new HttpParams()
      .append('article_id', id)
      .append('lang', lang); */
    return this.http
      .get('articles/getArticleByIdLang/' + id + "/" + lang)
      .pipe(map((res) => res as ArticleDetails));
  }

  /** @returns article_details */
  getDetById(id: string): Observable<ArticleDetails> {
    return this.http
      .get('articles/getArticleDetailsById/' + id)
      .pipe(map((res) => res as ArticleDetails));
  }

  /** @returns article_details[] */
  getByText(str: string): Observable<ArticleDetails[]> {
    return this.http.get('articles/getArticleDetailsByText/' + str).pipe(
      // tap((res) => console.log(res)),
      map((res) => res as ArticleDetails[])
    );
  }

  getFullArticle(id: string, lang: string): Observable<unknown> {
    return combineLatest([
      this.getByIdAndLang(id, lang),
      this.getById(id)
    ]).pipe(
      first(),
      map((res) => {
        // console.log(res)
        return { ...res[0], lang: res[1].lang_id };
      })
    );
  }

  /** @returns article_details_history */
  getHistoryById(id: string): Observable<ArticleDetailsHistory> {
    return this.http.get('articles/getArticleDetailsHistoryById/' + id).pipe(
      map((res) => res as ArticleDetailsHistory)
    );
  }

  reviewArticle(state: string, article: ArticleDetailsHistory): Observable<unknown> {
    let { _id, article_id, author_id, context, lang_id, reviewer_id, title } = article;
    return this.http.put(
      'articles/stateChange',
      { state, _id, article_id, author_id, context, lang_id, reviewer_id, title }
    );
  }

  getUnderConsiderationArticles(): Observable<ArticleDetailsHistory> {
    return this.http.get('articles/listUnderCons');
  }

  createArticle(article): Observable<unknown> {
    return this.http.post('articles/create', article);
  }
}
