import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) },
  { path: 'allusers', loadChildren: () => import('./all-users/all-users.module').then(m => m.AllUsersModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
