import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services/user/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'product-create',
    loadChildren: './pages/product-create/product-create.module#ProductCreatePageModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'product-detail/:id',
    loadChildren: './pages/product-detail/product-detail.module#ProductDetailPageModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'product-list',
    loadChildren: './pages/product-list/product-list.module#ProductListPageModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'product-list/:id',
    loadChildren: './pages/product-list/product-list.module#ProductListPageModule',
    canActivate: [AuthGuard],
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  {
    path: 'profile',
    loadChildren: './pages/profile/profile.module#ProfilePageModule',
    canActivate: [AuthGuard]
  },
  { path: 'reset-password', loadChildren: './pages/reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'vegetables', loadChildren: './pages/vegetables/vegetables.module#VegetablesPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
