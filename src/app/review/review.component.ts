import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ArticleService } from '../services/article.service';
import { ArticleDetailsHistory } from '../shared/article.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  articleToReview$: Observable<ArticleDetailsHistory>;
  id: string;
  constructor(
    public router: Router,
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((res) => {
      this.id = res.get('id');
    });
    this.observeArticleToReview();
  }

  observeArticleToReview() {
    this.articleToReview$ = this.articleService.getHistoryById(this.id);
  }

  submitReview(state: string) {
    this.articleService
      .reviewArticle(this.id, state)
      .pipe(first())
      .subscribe(() => {
        this.snackBar.open('Successful operation', null, { duration: 2000 });
        this.router.navigate(['review']);
      });
  }
}
