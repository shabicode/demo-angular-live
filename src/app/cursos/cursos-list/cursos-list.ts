import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cursos-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div style="max-width: 1200px; margin: 0 auto; padding: 20px;">
      <h1>📚 Lista de Cursos</h1>
      <p style="color: #666;">Estás viendo esta página porque pasaste el authGuard ✅</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; margin-top: 30px;">
        <div *ngFor="let curso of cursos" style="border: 1px solid #ddd; border-radius: 8px; padding: 20px; background: white;">
          <h3>{{ curso.titulo }}</h3>
          <p>{{ curso.descripcion }}</p>
          <p><strong>Instructor:</strong> {{ curso.instructor }}</p>
          <p><strong>Duración:</strong> {{ curso.duracion }}</p>
          <a [routerLink]="['/cursos', curso.id]" style="display: inline-block; margin-top: 10px; padding: 8px 16px; background: #1976d2; color: white; text-decoration: none; border-radius: 4px;">
            Ver Detalle →
          </a>
        </div>
      </div>
    </div>
  `
})
export class CursosListComponent {
  cursos = [
    {
      id: 1,
      titulo: 'Angular Avanzado',
      descripcion: 'Aprende ViewChild, Guards y Routing',
      instructor: 'Tu Profesor',
      duracion: '8 horas'
    },
    {
      id: 2,
      titulo: 'TypeScript Pro',
      descripcion: 'Domina TypeScript desde cero',
      instructor: 'María García',
      duracion: '12 horas'
    },
    {
      id: 3,
      titulo: 'RxJS Reactivo',
      descripcion: 'Programación reactiva con Observables',
      instructor: 'Carlos López',
      duracion: '6 horas'
    }
  ];
}
