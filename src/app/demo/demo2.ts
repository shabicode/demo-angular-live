import { Component, ElementRef, viewChild, viewChildren, contentChild, contentChildren, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursoDetalleComponent } from '../cursos/curso-detalle/curso-detalle';

@Component({
  selector: 'app-demo2',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="max-width: 900px; margin: 50px auto; padding: 20px;">
      <h1>⚡ Demo 2: Signals - viewChild & viewChildren</h1>
      <div style="padding: 10px; background: #e3f2fd; border-left: 4px solid #2196f3; margin-bottom: 20px;">
        <strong>🆕 Novedad Angular 17+:</strong> Uso de signals en lugar de decoradores
      </div>

      <!-- DEMO 1: viewChild con Signal -->
      <div style="margin: 30px 0; padding: 20px; border: 2px solid #1976d2; border-radius: 8px;">
        <h3>1️⃣ viewChild() Signal - Enfocar un input</h3>
        <input 
          #myInputSignal 
          type="text" 
          placeholder="Escribe algo..."
          style="padding: 10px; width: 300px; margin-right: 10px;"
        >
        <button (click)="enfocarSignal()" style="padding: 10px 20px; background: #4CAF50; color: white; border: none; cursor: pointer; border-radius: 4px;">
          🎯 Enfocar con Signal
        </button>
      </div>

      <!-- DEMO 2: viewChildren con Signal -->
      <div style="margin: 30px 0; padding: 20px; border: 2px solid #e91e63; border-radius: 8px;">
        <h3>2️⃣ viewChildren() Signal - Resaltar todas las cajas</h3>
        <div style="display: flex; gap: 10px; margin: 20px 0;">
          <div class="caja-signal" *ngFor="let num of [1,2,3,4]" 
               style="padding: 20px; border: 2px solid #ddd; width: 100px; text-align: center; border-radius: 4px;">
            Caja {{ num }}
          </div>
        </div>
        <button (click)="resaltarSignal()" style="padding: 10px 20px; background: #FF9800; color: white; border: none; cursor: pointer; border-radius: 4px;">
          ✨ Resaltar con Signal
        </button>
        <p style="margin-top: 10px; color: #666;">
          Total de cajas: <strong>{{ cajasSignal().length }}</strong>
        </p>
      </div>

      <hr style="margin: 50px 0; border: 2px solid #ddd;">

      <!-- SECCION CONTENTCHILD/CONTENTCHILDREN CON SIGNALS -->
      <h1>🎁 Demo 2: contentChild & contentChildren Signals</h1>

      <!-- DEMO 3: contentChild con Signal -->
      <div style="margin: 30px 0; padding: 20px; border: 2px solid #673ab7; border-radius: 8px;">
        <h3>3️⃣ contentChild() Signal - Un solo hijo proyectado</h3>
        <div style="padding: 15px; background: #ede7f6; border-radius: 4px; margin: 10px 0;">
          <strong>Contenido proyectado (1 componente):</strong>
          <ng-content select="[single]"></ng-content>
        </div>
        <button (click)="infoSingleSignal()" style="padding: 10px 20px; background: #9c27b0; color: white; border: none; cursor: pointer; border-radius: 4px;">
          📊 Info ContentChild Signal
        </button>
        <p *ngIf="singleInfo" style="margin-top: 10px; padding: 10px; background: #fff3cd; border-radius: 4px;">
          {{ singleInfo }}
        </p>
      </div>

      <!-- DEMO 4: contentChildren con Signal -->
      <div style="margin: 30px 0; padding: 20px; border: 2px solid #009688; border-radius: 8px;">
        <h3>4️⃣ contentChildren() Signal - Múltiples hijos proyectados</h3>
        <div style="padding: 15px; background: #e0f2f1; border-radius: 4px; margin: 10px 0;">
          <strong>Contenido proyectado (múltiples componentes):</strong>
          <ng-content select="[multiple]"></ng-content>
        </div>
        <button (click)="infoMultipleSignal()" style="padding: 10px 20px; background: #00796b; color: white; border: none; cursor: pointer; border-radius: 4px;">
          📊 Contar ContentChildren Signal
        </button>
        <p style="margin-top: 10px; color: #666;">
          Total detectado automáticamente: <strong>{{ multiplesCursosSignal().length }}</strong>
        </p>
        <p *ngIf="multipleInfo" style="margin-top: 10px; padding: 10px; background: #d1ecf1; border-radius: 4px;">
          {{ multipleInfo }}
        </p>
      </div>

      <div style="padding: 15px; background: #fff9c4; border-radius: 4px;">
        <strong>⚡ Ventajas de Signals:</strong>
        <ul style="margin: 10px 0;">
          <li>✅ <strong>Reactivos:</strong> Se actualizan automáticamente cuando cambia el DOM</li>
          <li>✅ <strong>Más simples:</strong> No necesitas ngAfterViewInit ni ngAfterContentInit</li>
          <li>✅ <strong>Tipado fuerte:</strong> Mejor inferencia de tipos</li>
          <li>✅ <strong>Composables:</strong> Puedes usar computed() y effect() con ellos</li>
          <li>✅ <strong>Rendimiento:</strong> Solo se reevalúan cuando es necesario</li>
        </ul>
      </div>

      <div style="padding: 15px; background: #e8f5e9; border-radius: 4px; margin-top: 20px;">
        <strong>📝 Código comparativo:</strong>
        <pre style="background: #263238; color: #aed581; padding: 15px; border-radius: 4px; overflow-x: auto;">
// ❌ Forma antigua (decoradores)
@ViewChild('myInput') myInput!: ElementRef;
@ViewChildren('caja') cajas!: QueryList&lt;ElementRef&gt;;

// ✅ Forma nueva (signals)
myInput = viewChild&lt;ElementRef&gt;('myInputSignal');
cajas = viewChildren&lt;ElementRef&gt;('.caja-signal');
        </pre>
      </div>
    </div>
  `
})
export class Demo2Component { 
  myInputSignal = viewChild<ElementRef>('myInputSignal');
  cajasSignal = viewChildren<ElementRef>('.caja-signal');
 
  singleCursoSignal = contentChild(CursoDetalleComponent);
  multiplesCursosSignal = contentChildren(CursoDetalleComponent);

  singleInfo: string = '';
  multipleInfo: string = '';

  constructor() { 
    effect(() => {
      console.log('⚡ Signal effect - Input:', this.myInputSignal());
      console.log('⚡ Signal effect - Cajas:', this.cajasSignal().length);
      console.log('⚡ Signal effect - Single Curso:', this.singleCursoSignal());
      console.log('⚡ Signal effect - Multiple Cursos:', this.multiplesCursosSignal().length);
    });
  }

  enfocarSignal() {
    const input = this.myInputSignal();
    if (input) {
      input.nativeElement.focus();
      console.log('🎯 Input enfocado con signal');
    }
  }

  resaltarSignal() {
    const cajas = this.cajasSignal();
    cajas.forEach(caja => {
      const el = caja.nativeElement;
      el.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      el.style.color = 'white';
      el.style.transform = 'scale(1.1) rotate(2deg)';
      el.style.transition = 'all 0.3s ease';
    });
    console.log('✨ Resaltadas', cajas.length, 'cajas con signal');
  }

  infoSingleSignal() {
    const curso = this.singleCursoSignal();
    if (curso) {
      this.singleInfo = `✅ contentChild() Signal detectado: CursoDetalleComponent con ID: ${curso.cursoId || 'N/A'}`;
    } else {
      this.singleInfo = '❌ No hay contentChild proyectado';
    }
    console.log('📊', this.singleInfo);
  }

  infoMultipleSignal() {
    const cursos = this.multiplesCursosSignal();
    const count = cursos.length;
    if (count > 0) {
      const ids = cursos.map(c => c.cursoId).join(', ');
      this.multipleInfo = `✅ ${count} contentChildren() Signals detectados con IDs: ${ids}`;
    } else {
      this.multipleInfo = '❌ No hay contentChildren proyectados';
    }
    console.log('📊', this.multipleInfo);
  }
}
