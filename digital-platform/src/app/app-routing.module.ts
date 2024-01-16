import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationComponent } from './authorization/authorization.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guards/auth.guard';
import { SigninComponent } from './authorization/signin/signin.component';
import { SignupComponent } from './authorization/signup/signup.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'authorization', component: AuthorizationComponent, canActivate: [authGuard], children: [
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
  ] },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
