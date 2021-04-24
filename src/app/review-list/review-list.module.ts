import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewListComponent } from './review-list.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

const routes: Routes = [
  {
    path: '',
    component: ReviewListComponent,
  },
];

@NgModule({
  declarations: [ReviewListComponent],
  imports: [CommonModule, MatCardModule, RouterModule.forChild(routes)],
})
export class ReviewListModule {}
