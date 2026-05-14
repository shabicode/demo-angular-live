import { Component } from '@angular/core';
import { DemoComponent } from './demo';
import { CursoDetalleComponent } from '../cursos/curso-detalle/curso-detalle';
import { CursosListComponent } from "../cursos/cursos-list/cursos-list";

@Component({
  selector: 'app-demo-wrapper',
  standalone: true,
  imports: [DemoComponent, CursoDetalleComponent, CursosListComponent],
  template: `
    <app-demo>
      <!-- ContentChildren: Múltiples componentes con atributo 'multiple' -->
      <app-curso-detalle multiple [cursoId]="'React-201'" [isEmbedded]="true"></app-curso-detalle>
      <app-curso-detalle multiple [cursoId]="'Vue-301'" [isEmbedded]="true"></app-curso-detalle>
      <app-curso-detalle multiple [cursoId]="'Node-401'" [isEmbedded]="true"></app-curso-detalle>

      <app-curso-detalle single [cursoId]="'Angular-133'" [isEmbedded]="true"></app-curso-detalle>
      <app-cursos-list single ></app-cursos-list>
    </app-demo>
  `
})
export class DemoWrapperComponent {}
