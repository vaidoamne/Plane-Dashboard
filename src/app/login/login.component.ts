import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";
import{CommonModule} from "@angular/common";
import{NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirectToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  title = 'AngularDashboard';
  currentForm: 'login' | 'signup' | null = null;

  loginData = { emailOrPhone: '', password: '' };
  signupData = { email: '', phone: '', firstName: '', lastName: '', password: '', confirmPassword: '' };

  showForm(form: 'login' | 'signup') {
    this.currentForm = form;
  }

  login() {
    // Implement your login logic here
    console.log('Login', this.loginData);
  }

  signup() {
    // Implement your signup logic here
    console.log('Signup', this.signupData);
  }
}
