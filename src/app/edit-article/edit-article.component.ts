import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ArticleService } from '../services/article.service';
import { ArticleDetails } from '../shared/article.model';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss'],
})
export class EditArticleComponent implements OnInit {
  articleForm: FormGroup;
  articleId: string;
  articleLang: string;
  article: ArticleDetails;
  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRouterParams();
    this.observeArticleByIdAndLang();
  }

  getRouterParams() {
    this.activatedRoute.paramMap.pipe(first()).subscribe((res) => {
      this.articleId = res.get('id');
      this.articleLang = res.get('lang');
      this.observeArticleByIdAndLang();
    });
  }

  observeArticleByIdAndLang() {
    this.articleService
      .getByIdAndLang(this.articleId, this.articleLang)
      .pipe(first())
      .subscribe((res) => {
        this.article = res;
        if (!this.article) {
          this.article = {
            context: '',
            title: '',
          };
        }
        this.resetArticleForm();
      });
  }

  resetArticleForm() {
    this.articleForm = new FormGroup({
      title: new FormControl(this.article.title, Validators.required),
      context: new FormControl(this.article.context, Validators.required),
      article_id: new FormControl(this.articleId),
      lang_id: new FormControl(this.articleLang),
    });
  }

  submit() {
    this.articleService
      .createArticle(this.articleForm.value)
      .pipe(first())
      .subscribe(
        () => {
          this.snackBar.open('Successful operation!', null, {
            duration: 2000,
          });
          this.router.navigate(['articles']);
        },
        (err) => {
          console.error(err.message);
        }
      );
  }
}
