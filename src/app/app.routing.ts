import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
/*  { path: '', redirectTo: 'park_ages', pathMatch: 'full' },
  { path: '**', redirectTo: 'park_pages/dashboard' }*/
  // { path: '', redirectTo: 'pages', pathMatch: 'full' },
  // { path: '**', redirectTo: 'pages/dashboard' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
