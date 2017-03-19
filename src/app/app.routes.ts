import { Routes } from '@angular/router';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';
import {ConnectionComponent} from "./connection/connection.component";
import {RegisterComponent} from "./register/register.component";

export const ROUTES: Routes = [
  { path: 'connection', component: ConnectionComponent},
  { path: '',      component: ConnectionComponent },
  { path: 'about', component: AboutComponent },
  { path: 'barrel', loadChildren: './+barrel#BarrelModule'},
  { path: 'register', component: RegisterComponent},
  { path: '**',    component: NoContentComponent }
];
