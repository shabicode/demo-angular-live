import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-curso-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div style="max-width: 800px; margin: 0 auto; padding: 20px;">
      <a *ngIf="!isEmbedded" routerLink="/cursos" style="color: #1976d2; text-decoration: none;">
        ← Volver a cursos
      </a>
      
      <div style="margin-top: 20px; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: white;">
        <h2>📚 Curso #{{ cursoId || 'demo' }}</h2>
        <p style="color: #666;">
          {{ isEmbedded ? 'Componente proyectado mediante @ContentChild/@ContentChildren' : 'Parámetro de ruta detectado' }}
        </p>
      </div>
    </div>
  `
})
export class CursoDetalleComponent implements OnInit {
  @Input() cursoId: string | null = null;
  @Input() isEmbedded: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Si no viene como Input, intentar obtener de la ruta
    if (!this.cursoId) {
      this.cursoId = this.route.snapshot.paramMap.get('id');
    }
    console.log('📖 Curso ID:', this.cursoId);
  }
}