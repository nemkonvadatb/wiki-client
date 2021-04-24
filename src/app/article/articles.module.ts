import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './articles.component';
import { Routes, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

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
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class ArticlesModule {}
