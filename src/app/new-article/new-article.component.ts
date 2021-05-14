import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ArticleService } from '../services/article.service';
import { LANG_LIST } from '../shared/language.list';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit {
  articleForm: FormGroup;
  articleId: string;
  articleLang: string;
  newId: number;
  langList = LANG_LIST;
  constructor(
    private articleService: ArticleService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.newId = Math.floor(100000 + Math.random() * 900000);
    this.resetArticleForm();
  }

  resetArticleForm() {
    this.articleForm = new FormGroup({
      title: new FormControl("", Validators.required),
      context: new FormControl("", Validators.required),
      article_id: new FormControl(this.newId),
      lang_id: new FormControl("", Validators.required),
    });
  }

  submit() {
    this.articleService
      .createArticle(this.articleForm.value)
      .pipe(first())
      .subscribe(
        (res) => {
          this.snackBar.open('Successful operation!', null, {
            duration: 2000,
          });
          // console.log(res);
          
          this.router.navigate(['articles']);
        },
        (err) => {
          console.error(err.message);
          this.snackBar.open("You don't have permission to create an article!", null, {
            duration: 3000,
          });
          this.router.navigate(['articles']);
        }
      );
  }

}
