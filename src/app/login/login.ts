import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  template: `
    <div style="max-width: 400px; margin: 50px auto; padding: 30px; border: 1px solid #ddd; border-radius: 8px;">
      <h2>Login</h2>
      <p>Selecciona tu rol para simular el login:</p>
      
      <button (click)="login('estudiante')" style="width: 100%; padding: 15px; margin: 10px 0; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">
       Estudiante
      </button>
      
      <button (click)="login('instructor')" style="width: 100%; padding: 15px; margin: 10px 0; background: #2196F3; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Instructor
      </button>
      
      <button (click)="login('admin')" style="width: 100%; padding: 15px; margin: 10px 0; background: #FF5722; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Admin
      </button>
      
      <div *ngIf="currentRole" style="margin-top: 20px; padding: 10px; background: #e3f2fd; border-radius: 4px;">
        <p>✅ Logueado como: <strong>{{ currentRole }}</strong></p>
        <button (click)="logout()" style="padding: 10px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Cerrar Sesión
        </button>
      </div>
    </div>
  `,
  styleUrl: './login.css',
})
export class Login {
  currentRole: string | null = null;

  constructor(private router: Router) {
    this.currentRole = localStorage.getItem('user_role');
  }

  login(role: string) { 
    localStorage.setItem('auth_token', 'fake-jwt-token-123');
    localStorage.setItem('user_role', role);
    this.currentRole = role;

    this.router.navigate(['/']);
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    this.currentRole = null;
  }
}
