import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './articles.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
  },
];

@NgModule({
  declarations: [ArticlesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ArticlesModule { }
