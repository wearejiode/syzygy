import { Routes } from '@angular/router';
import { BlogPostComponent } from './content/blog-post/blog-post.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: ':slug',
    loadComponent: () =>
      import('./content/blog-post/blog-post.component').then(m => m.BlogPostComponent)
  },
  {
    path: '**',
    redirectTo: 'portfolio-site'
  }
];
