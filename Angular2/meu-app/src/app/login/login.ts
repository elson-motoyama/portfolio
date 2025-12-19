import { Component } from '@angular/core';
import { AuthService } from '../auth';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddSpacing } from '../add-spacing';
import { DisplayBlock } from '../display-block';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    DisplayBlock,
    AddSpacing,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  standalone: true,
})
export class LoginComponent {
  errorMessage: string = '';
  loginForm: FormGroup;
  
  constructor(
    private authService: AuthService, 
    private router: Router,
    private fb: FormBuilder) {
    
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, preencha todos os campos.';
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.authService.storeToken(response.token);
        this.router.navigate(['/lista']);
      },
      error: (e) => {
        this.errorMessage = 'Erro ao fazer login. Verifique as credenciais!';
      }
    });
  }
}
