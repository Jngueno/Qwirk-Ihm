import { Routes } from '@angular/router';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import {AuthGuard} from "./_guards/auth.guard";
import {ConnectionComponent} from "./GIN/connection/connection.component";
import { DataResolver } from './app.resolver';
import {HomeComponent} from "./home/home.component";
// import {RegisterComponent} from "./register/register.component";
import {RegisterComponent} from "./GIN/register/register.component";
import {ResetGuard} from "./_guards/reset.guard";
import {ResetPasswordComponent} from "./GIN/resetPassword/resetPassword.component";
import {WorkbenchComponent} from "./shared/workbench/workbench.component";
import {RecordComponent} from "./chattManager/record/record.component";

export const ROUTES: Routes = [
  { path: 'login', component: ConnectionComponent},
  { path: 'reset', component: ResetPasswordComponent, canActivate: [ResetGuard]},
  { path: '', component: WorkbenchComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'barrel', loadChildren: './+barrel#BarrelModule'},
  { path: 'register', component: RegisterComponent},
  { path: 'workbench', component: WorkbenchComponent},
  { path: 'record', component: RecordComponent},
  { path: 'home', component: HomeComponent},
  { path: '**',    component: NoContentComponent }
];
