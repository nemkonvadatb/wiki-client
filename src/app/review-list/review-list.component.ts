import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ArticleService } from '../services/article.service';
import { UserService } from '../services/user.service';
import { ArticleDetailsHistory } from '../shared/article.model';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit, OnDestroy {
  articles$: Observable<ArticleDetailsHistory>
  userSubs: Subscription;
  isLector: boolean = true;

  constructor(
    private articleService: ArticleService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    if (this.isLector) {
      this.observeUnderConsiderationArticles();
    }
  }

  getUserInfo() {
    const userId = '' + localStorage.getItem('user-id');
    this.userSubs = this.userService.get(userId).subscribe(
      (result) => {
        const userInfo = result as any;
        this.isLector = userInfo.role == "lector"
      },
      (error) => {
        console.error(error);
      }
    );
  }

  observeUnderConsiderationArticles() {
    this.articles$ = this.articleService.getUnderConsiderationArticles();
  }

  ngOnDestroy(): void {
    if (this.userSubs) {
      this.userSubs.unsubscribe();
    }
  }
}
