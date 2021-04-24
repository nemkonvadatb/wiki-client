import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleService } from '../services/article.service';
import { ArticleDetailsHistory } from '../shared/article.model';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {
  articles$: Observable<ArticleDetailsHistory> 
  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.observeUnderConsiderationArticles();
  }

  observeUnderConsiderationArticles() {
    this.articles$ = this.articleService.getUnderConsiderationArticles();
  }
}
