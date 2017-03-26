import { Routes } from '@angular/router';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';
import {ConnectionComponent} from "./GIN/connection/connection.component";
import {RegisterComponent} from "./GIN/register/register.component";
import {ResetPasswordComponent} from "./GIN/resetPassword/resetPassword.component";
import {AuthGuard} from "./_guards/auth.guard";
import {HomeComponent} from "./home/home.component";
import {ResetGuard} from "./_guards/reset.guard";

export const ROUTES: Routes = [
  { path: 'login', component: ConnectionComponent},
  { path: 'reset', component: ResetPasswordComponent, canActivate: [ResetGuard]},
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'barrel', loadChildren: './+barrel#BarrelModule'},
  { path: 'register', component: RegisterComponent},
  { path: '**',    component: NoContentComponent }
];
