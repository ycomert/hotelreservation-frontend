import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value).subscribe(
        (response: string) => {
          console.log('Login successful', response);
          this.authService.login(response); // Token'ı localStorage'a kaydet
          this.router.navigate(['/']);
        },
        error => {
          console.error('Login failed', error);
          this.errorMessage = 'Login failed. Please try again.';
          setTimeout(() => {
            this.errorMessage = null;
          }, 2000);
        }
      );
    }
  }
}
