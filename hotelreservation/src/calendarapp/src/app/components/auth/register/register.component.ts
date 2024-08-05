import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerform: FormGroup
  message: string | null = null;  // Mesaj değişkeni
  errorMessage: string | null = null;  // Mesaj değişkeni

  constructor(private FormBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerform = this.FormBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit(): void {
    if (this.registerform.valid) {
      this.authService.registerUser(this.registerform.value).subscribe(
        response => {
          this.message = 'Kayıt Başarıyla Oluşturuldu.Ana Sayfaya Yönlendiriliyorsunuz!';
          console.log('', response)
          setTimeout(() => {
            this.message = null;
            this.router.navigate(['/']);
          }, 2000);
        },
        error => {
          console.log('Kayıt Hatası', error);
          this.errorMessage = 'Kayıt Eklenemedi';
          setTimeout(() => {
            this.errorMessage = null;
          }, 2000);  // 2000 milisaniye = 2 saniye // Hata mesajını güncelle
        }
      )
    }
  }
}
