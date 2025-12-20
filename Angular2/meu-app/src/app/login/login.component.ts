import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddSpacingDirective } from '../shared/directives/add-spacing.directive';
import { DisplayBlockDirective } from '../shared/directives/display-block.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../shared/auth/auth.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    DisplayBlockDirective,
    AddSpacingDirective,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
})
export class LoginComponent {
  loginForm: FormGroup;
  
  constructor(
    private readonly authService: AuthService, 
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly notificationService: NotificationService
  ) {
    
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.notificationService.error('Por favor, preencha todos os campos.');
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.authService.storeToken(response.token);
        this.router.navigate(['/lista']);
      },
      error: (e) => {
      this.notificationService.error('Erro ao fazer login. Verifique as credenciais!');
      }
    });
  }
}
