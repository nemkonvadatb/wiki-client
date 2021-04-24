import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditArticleComponent } from './edit-article.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {
    path: '',
    component: EditArticleComponent,
  },
];

@NgModule({
  declarations: [EditArticleComponent],
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterModule.forChild(routes),
  ],
})
export class EditArticleModule {}
