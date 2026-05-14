import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <div style="text-align: center; padding: 40px;">  
      <div style="margin-top: 30px;">
        <a routerLink="/login" style="margin: 10px; padding: 10px 20px; background: #1976d2; color: white; text-decoration: none; border-radius: 4px;">
          Ir a Login
        </a>
        <a routerLink="/cursos" style="margin: 10px; padding: 10px 20px; background: #1976d2; color: white; text-decoration: none; border-radius: 4px;">
          Ver Cursos
        </a>
        <a routerLink="/demo" style="margin: 10px; padding: 10px 20px; background: #e91e63; color: white; text-decoration: none; border-radius: 4px;">
          Demo (Decoradores)
        </a>
        <a routerLink="/demo2" style="margin: 10px; padding: 10px 20px; background: #9c27b0; color: white; text-decoration: none; border-radius: 4px;">
          ⚡ Demo 2 (Signals)
        </a>
      </div>
    </div>
  `,
  styleUrl: './home.css',
})
export class Home {}
