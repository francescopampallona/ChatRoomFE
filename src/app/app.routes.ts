import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register'
import { LoginComponent } from './pages/login/login';
import { HomeComponent } from './pages/home/home';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];