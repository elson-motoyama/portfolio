import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from './shared/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isLoggedIn$!: Observable<boolean>;

  constructor(private readonly authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  protected readonly title = signal('meu-app');
}
