import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import {
  Article,
  ArticleDetails,
  ArticleDetailsHistory,
  MOCK_ARTICLES,
  MOCK_ARTICLE_DETAILS,
  MOCK_ARTICLE_DETAILS_HISTORY,
} from '../shared/article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  getById(id: string): Observable<Article[]> {
    const params = new HttpParams().append('article_id', id);
    return this.http
      .get('articles/find_by_id', { params })
      .pipe(map((res) => res as Article[]));
  }

  getByIdAndLang(id: string, lang: string): Observable<ArticleDetails> {
    const params = new HttpParams()
      .append('article_id', id)
      .append('lang', lang);
    return this.http
      .get('articles/find_by_id_lang', { params })
      .pipe(map((res) => res as ArticleDetails));
  }

  getByKeywords(tag: string): Observable<ArticleDetails[]> {
    const params = new HttpParams().append('tags', tag);
    return this.http.get('articles/find_tag', { params }).pipe(
      tap((res) => console.log(res)),
      map((res) => res as ArticleDetails[])
    );
  }

  getFullArticle(id: string, lang: string): Observable<ArticleDetails> {
    return combineLatest([
      of(MOCK_ARTICLE_DETAILS[0]) /* this.getByIdAndLang(id, lang) */,
      of(MOCK_ARTICLES) /* this.getById(id) */,
    ]).pipe(
      first(),
      map(([articleDetails, article]) => {
        return { ...articleDetails, lang: article[0].lang };
      })
    );
  }

  getHistoryById(id: string): Observable<ArticleDetailsHistory> {
    return of(MOCK_ARTICLE_DETAILS_HISTORY); //this.http.get('articles/article_history' + id);
  }

  reviewArticle(id: string, state: string): Observable<unknown> {
    return this.http.put('articles/stateChange', { id, state });
  }

  getUnderConsiderationArticles(): Observable<ArticleDetailsHistory> {
    return this.http.get('articles/listUnderCons');
  }

  createArticle(article): Observable<unknown> {
    return this.http.post('articles/create', article);
  }
}
