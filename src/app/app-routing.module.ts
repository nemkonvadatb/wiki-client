import { AuthGuard } from './auth-guard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'articles',
    loadChildren: () =>
      import('./article/articles.module').then((m) => m.ArticlesModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'articles/:id/:lang',
    loadChildren: () =>
      import('./article/articles.module').then((m) => m.ArticlesModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'review/:id',
    loadChildren: () =>
      import('./review/review.module').then((m) => m.ReviewModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'review',
    loadChildren: () =>
      import('./review-list/review-list.module').then(
        (m) => m.ReviewListModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-article/:id/:lang',
    loadChildren: () =>
      import('./edit-article/edit-article.module').then(
        (m) => m.EditArticleModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'new-article',
    loadChildren: () =>
      import('./new-article/new-article.module').then(
        (m) => m.NewArticleModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '**', redirectTo: 'articles', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
