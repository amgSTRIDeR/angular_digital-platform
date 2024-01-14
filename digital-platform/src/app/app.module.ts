import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { AuthorizationComponent } from './authorization/authorization.component';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [{
  path: '',
  component: AuthorizationComponent
},
{path: 'not-found', component: NotFoundComponent},
{path: '**', redirectTo: '/not-found'}]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthorizationComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
