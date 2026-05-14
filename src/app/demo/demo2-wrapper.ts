import { Component } from '@angular/core';
import { Demo2Component } from './demo2';
import { CursoDetalleComponent } from '../cursos/curso-detalle/curso-detalle';

@Component({
  selector: 'app-demo2-wrapper',
  standalone: true,
  imports: [Demo2Component, CursoDetalleComponent],
  template: `
    <app-demo2>
      <!-- ContentChild: Un solo componente con atributo 'single' -->
      <app-curso-detalle single [cursoId]="'Signals-101'" [isEmbedded]="true"></app-curso-detalle>
      
      <!-- ContentChildren: Múltiples componentes con atributo 'multiple' -->
      <app-curso-detalle multiple [cursoId]="'RxJS-201'" [isEmbedded]="true"></app-curso-detalle>
      <app-curso-detalle multiple [cursoId]="'NgRx-301'" [isEmbedded]="true"></app-curso-detalle>
      <app-curso-detalle multiple [cursoId]="'TypeScript-401'" [isEmbedded]="true"></app-curso-detalle>
    </app-demo2>
  `
})
export class Demo2WrapperComponent {}
