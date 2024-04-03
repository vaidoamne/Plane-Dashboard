import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
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
