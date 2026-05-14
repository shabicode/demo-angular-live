import { Component, ElementRef, ViewChild, ViewChildren, ContentChild, ContentChildren, QueryList, AfterViewInit, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { CursoDetalleComponent } from '../cursos/curso-detalle/curso-detalle';
import { CursosListComponent } from '../cursos/cursos-list/cursos-list';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="max-width: 800px; margin: 50px auto; padding: 20px;">
      <h1>🔍 Demo: ViewChild & ViewChildren</h1>
      
      <!-- DEMO 1: ViewChild -->
      <div style="margin: 30px 0; padding: 20px; border: 2px solid #1976d2; border-radius: 8px;">
        <h3>1️⃣ ViewChild - Enfocar un input</h3>
        <input 
          #myInput 
          type="text" 
          placeholder="Haz clic en el botón..."
          style="padding: 10px; width: 300px; margin-right: 10px;"
        >
        <button (click)="enfocar()" style="padding: 10px 20px; background: #4CAF50; color: white; border: none; cursor: pointer;">
          🎯 Enfocar
        </button>
      </div>

      <!-- DEMO 2: ViewChildren -->
      <div style="margin: 30px 0; padding: 20px; border: 2px solid #e91e63; border-radius: 8px;">
        <h3>2️⃣ ViewChildren - Resaltar todas las cajas</h3>
        <div style="display: flex; gap: 10px; margin: 20px 0;">
          <div #caja *ngFor="let num of [1,2,3]" 
               style="padding: 20px; border: 2px solid #ddd; width: 100px; text-align: center;">
            Caja &#123;&#123; num &#125;&#125;
          </div>
        </div>
        <button (click)="resaltar()" style="padding: 10px 20px; background: #FF9800; color: white; border: none; cursor: pointer;">
          ✨ Resaltar Todas
        </button>
      </div>

      <div style="padding: 15px; background: #f0f0f0; border-radius: 4px;">
        <strong>💡 Lo que hace el código:</strong>
        <ul style="margin: 10px 0;">
          <li>ViewChild captura referencia al input</li>
          <li>ViewChildren captura las 3 cajas</li>
          <li>Método enfocar(): enfoca el input</li>
          <li>Método resaltar(): cambia fondo a amarillo</li>
        </ul>
      </div>

      <hr style="margin: 50px 0; border: 2px solid #ddd;">

      <!-- SECCION CONTENTCHILD/CONTENTCHILDREN -->
      <h1>🎁 Demo: ContentChild & ContentChildren</h1>

      <!-- DEMO 3: ContentChild -->
      <div style="margin: 30px 0; padding: 20px; border: 2px solid #673ab7; border-radius: 8px;">
        <h3>3️⃣ ContentChild - Un solo hijo proyectado</h3>
        <div style="padding: 15px; background: #ede7f6; border-radius: 4px; margin: 10px 0;">
          <strong>Contenido proyectado (1 componente):</strong>
          <ng-content select="[single]"></ng-content>
        </div>
        <button (click)="infoSingle()" style="padding: 10px 20px; background: #9c27b0; color: white; border: none; cursor: pointer; border-radius: 4px;">
          📊 Mostrar info del ContentChild
        </button>
        <p *ngIf="singleInfo" style="margin-top: 10px; padding: 10px; background: #fff3cd; border-radius: 4px;">
          {{ singleInfo }}
        </p>
      </div>

      <!-- DEMO 4: ContentChildren -->
      <div style="margin: 30px 0; padding: 20px; border: 2px solid #009688; border-radius: 8px;">
        <h3>4️⃣ ContentChildren - Múltiples hijos proyectados</h3>
        <div style="padding: 15px; background: #e0f2f1; border-radius: 4px; margin: 10px 0;">
          <strong>Contenido proyectado (múltiples componentes):</strong>
          <ng-content select="[multiple]"></ng-content>
        </div>
        <button (click)="infoMultiple()" style="padding: 10px 20px; background: #00796b; color: white; border: none; cursor: pointer; border-radius: 4px;">
          📊 Contar ContentChildren
        </button>
        <p *ngIf="multipleInfo" style="margin-top: 10px; padding: 10px; background: #d1ecf1; border-radius: 4px;">
          {{ multipleInfo }}
        </p>
      </div>

      <div style="padding: 15px; background: #fff9c4; border-radius: 4px;">
        <strong>💡 Diferencias clave:</strong>
        <ul style="margin: 10px 0;">
          <li><strong>@ViewChild/@ViewChildren:</strong> Accede a elementos en el template del componente</li>
          <li><strong>@ContentChild/@ContentChildren:</strong> Accede a contenido proyectado desde el padre</li>
          <li><strong>ngAfterViewInit:</strong> Para ViewChild/ViewChildren</li>
          <li><strong>ngAfterContentInit:</strong> Para ContentChild/ContentChildren</li>
        </ul>
      </div>
    </div>
  `
})
export class DemoComponent implements AfterViewInit, AfterContentInit {
  // ViewChild/ViewChildren
  @ViewChild('myInput') myInput!: ElementRef;
  @ViewChildren('caja') cajas!: QueryList<ElementRef>;

  // ContentChild/ContentChildren
  @ContentChild(CursoDetalleComponent) singleCurso!: CursoDetalleComponent;
  @ContentChild(CursosListComponent) singleCursoList!: CursosListComponent;
  @ContentChildren(CursoDetalleComponent) multiplesCursos!: QueryList<CursoDetalleComponent>;

  singleInfo: string = '';
  multipleInfo: string = '';

  ngAfterViewInit() {
    console.log('✅ ViewChild listo:', this.myInput);
    console.log('✅ ViewChildren listo:', this.cajas.length, 'cajas');
  }

  ngAfterContentInit() {
    console.log('✅ ContentChild listo:', this.singleCurso);
    console.log('✅ ContentChildren listo:', this.multiplesCursos?.length || 0, 'componentes');
  }

  enfocar() {
    this.myInput.nativeElement.focus();
    this.myInput.nativeElement.style.border = '2px solid #4CAF50';
    this.myInput.nativeElement.style.boxShadow = '0 0 5px #4CAF50';
    this.myInput.nativeElement.style.outline = 'none';
    this.myInput.nativeElement.style.transition = 'all 0.3s ease';
    console.log('🎯 Input enfocado');
  }

  resaltar() {
    this.cajas.forEach(caja => {
      caja.nativeElement.style.background = 'yellow';
      caja.nativeElement.style.transform = 'scale(1.1)';
      caja.nativeElement.style.transition = 'all 0.3s ease';
    });
    console.log('✨ Resaltadas', this.cajas.length, 'cajas');
  }

  infoSingle() {
    if (this.singleCurso) {
      this.singleInfo = `✅ ContentChild detectado: CursoDetalleComponent con ID: ${this.singleCurso.cursoId || 'N/A'}`;
    } else {
      this.singleInfo = '❌ No hay ContentChild proyectado';
    }
    console.log('📊', this.singleInfo);
  }

  infoMultiple() {
    const count = this.multiplesCursos?.length || 0;
    if (count > 0) {
      const ids = this.multiplesCursos.map(c => c.cursoId).join(', ');
      this.multipleInfo = `✅ ${count} ContentChildren detectados con IDs: ${ids}`;
    } else {
      this.multipleInfo = '❌ No hay ContentChildren proyectados';
    }
    console.log('📊', this.multipleInfo);
    console.log(this.singleCursoList);
  }
}