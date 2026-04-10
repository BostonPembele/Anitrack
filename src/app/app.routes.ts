import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'watchlist',
    loadComponent: () => import('./pages/watchlist/watchlist.page').then(m => m.WatchlistPage)
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./pages/detail/detail.page').then(m => m.DetailPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage)
  },
];