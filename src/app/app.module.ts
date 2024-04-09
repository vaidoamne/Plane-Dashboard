import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgIf} from "@angular/common";
@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AppComponent,
    LoginComponent,
    FormsModule,
    // Add FormsModule here
  ],
  providers: [],
})
export class AppModule { }
