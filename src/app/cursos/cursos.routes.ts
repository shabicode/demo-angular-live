import { Routes } from '@angular/router'; 
import { CursoDetalleComponent } from './curso-detalle/curso-detalle';
import { CursosListComponent } from './cursos-list/cursos-list';

export const CURSOS_ROUTES: Routes = [
  { path: '', component: CursosListComponent },
  { path: ':id', component: CursoDetalleComponent }
];