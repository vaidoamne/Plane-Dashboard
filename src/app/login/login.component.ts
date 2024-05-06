import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import{HttpClientModule} from "@angular/common/http";
import {NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {PrimeNGConfig} from "primeng/api";

export interface LoginResponse {
  first_name: string;
  access_level: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [HttpClientModule, NgIf, PaginatorModule],
  standalone: true,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router,private primengConfig: PrimeNGConfig, private http: HttpClient) {}

  loginData = { email: '', password: '' };
  signupData = { email: '', phone_number: '', first_name: '', last_name: '', password: '',level:''};
  currentForm: 'login' | 'signup' | null = null;

  showForm(form: 'login' | 'signup') {
    this.currentForm = form;
  }


  login() {
    if (!this.loginData.email || !this.loginData.password) {
      alert('Email and password are required.');
      return;
    }

    this.http.post<any>('http://127.0.0.1:8000/login', {
      email: this.loginData.email,
      password: this.loginData.password
    }).subscribe({
      next: (response: any) => {
        console.log('Login response:', response);
        if (response.first_name && response.access_level) {
          localStorage.setItem('currentUser', response.first_name);

          localStorage.setItem('AccessLevel', response.access_level);
          this.router.navigate(['/dashboard']);
        } else {
          alert('Login failed. Invalid email or password.');
        }
      },
      error: error => {
        console.error('Login error:', error);
        alert('Login failed. Please try again later.');
      }
    });
  }
  signup() {

    this.http.post<any>('http://127.0.0.1:8000/signup', this.signupData)
      .subscribe({
        next: response => {
          console.log('Signup response:', response);
          if (response === 0) {
            alert('Signup successful.');
          } else {
            alert('Signup failed. Please check your inputs.');
          }
        },
        error: error => {
          console.error('Signup error:', error);
          alert('Signup failed. Please try again later.');
        }
      });
  }


  redirectToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
