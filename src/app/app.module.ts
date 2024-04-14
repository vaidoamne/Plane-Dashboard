import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {NgIf} from "@angular/common";
import {AuthModule} from '@auth0/auth0-angular';
import {HttpClientModule} from "@angular/common/http";
import {GraphsComponent} from "./graphs/graphs.component";

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AppComponent,
    LoginComponent,
    FormsModule,
    GraphsComponent,
    DashboardComponent,
    BrowserModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-rbd5dh8xqx3ddu4z.us.auth0.com',
      clientId: 'UbKDvLZx7DV1XaddV27z1YI9xIqGyk3J'
    }),
    NgIf

  ],
  providers: [],

})
export class AppModule {
}
