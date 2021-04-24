import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { ArticleService } from '../services/article.service';
import { ArticleDetails, MOCK_ARTICLE_DETAILS } from '../shared/article.model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  keywordForm: FormGroup;
  articleDetailsList$: Observable<ArticleDetails[]>;
  article$: Observable<ArticleDetails>;
  isListActive: boolean;
  articleIdentifier;
  constructor(
    private articleService: ArticleService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.keywordForm = new FormGroup({ keywords: new FormControl('') });
    this.checkRouteParams();
  }

  checkRouteParams() {
    this.activatedRoute.paramMap.subscribe((res) => {
      this.articleIdentifier = { id: res.get('id'), lang: res.get('lang') };
      if (this.articleIdentifier.id && this.articleIdentifier.lang) {
        this.observeFullArticle(
          this.articleIdentifier.id,
          this.articleIdentifier.lang
        );
        this.isListActive = false;
      } else {
        this.observeArticleDetailsByTags();
        this.isListActive = true;
      }
    });
  }

  observeFullArticle(id: string, lang: string) {
    this.article$ = this.articleService.getFullArticle(id, lang).pipe(first());
  }

  observeArticleDetailsByTags() {
    this.articleDetailsList$ =
      /* this.articleService
      .getByKeywords(this.keywordForm.value.keywords) */
      of(MOCK_ARTICLE_DETAILS).pipe(first());
  }

  navigateToArticle(article: ArticleDetails, lang?: string) {
    this.router.navigate([
      '/articles',
      article.article_id,
      lang || article.lang_id,
    ]);
  }
}
