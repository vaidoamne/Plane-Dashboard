import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {GraphsComponent} from "./graphs/graphs.component";
import {MapComponent} from "./map/map.component";
import {TasksComponent} from "./tasks/tasks.component";
import {SettingsComponent} from "./settings/settings.component";
import {PickAirplaneComponent} from "./pick-airport/pick-airplane.component";

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'graphs', component: GraphsComponent },
  { path: 'map', component: MapComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'pick-airplane', component: PickAirplaneComponent }

];
