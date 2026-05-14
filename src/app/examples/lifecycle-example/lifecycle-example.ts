import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, AfterViewInit, AfterContentInit, AfterViewChecked, AfterContentChecked, DoCheck, ViewChild, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface LogEntry {
  hook: string;
  timestamp: string;
  message: string;
  color: string;
}

@Component({
  selector: 'app-lifecycle-example',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lifecycle-example.html',
  styleUrls: ['./lifecycle-example.css']
})
export class LifecycleExampleComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit, AfterContentInit, AfterViewChecked, AfterContentChecked, DoCheck {
  
  // ViewChild para demostrar AfterViewInit
  @ViewChild('messageInput') messageInput!: ElementRef<HTMLInputElement>;

  // Input para demostrar OnChanges (si se usa como componente hijo)
  @Input() externalValue = 0;

  // Array de logs para mostrar el ciclo de vida
  logs: LogEntry[] = [];

  // Contadores y estados
  counter = 0;
  timerRunning = false;
  timerInterval: any;
  message = '';
  componentAlive = true;

  // Flags para tracking
  ngOnInitCalled = false;
  ngAfterViewInitCalled = false;
  ngOnChangesCalled = false;

  // === CONSTRUCTOR ===
  // Se ejecuta PRIMERO, cuando Angular crea el componente
  constructor() {
    this.addLog('constructor', 'Componente creado - Se ejecuta PRIMERO', '#9c27b0');
    console.log('🏗️ Constructor: Componente creado');
  }

  // === ngOnChanges ===
  // Se ejecuta cuando cambian los @Input() del componente
  // Puede ejecutarse múltiples veces
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnChangesCalled = true;
    
    const changeDetails = Object.keys(changes).map(key => {
      const change = changes[key];
      return `${key}: ${change.previousValue} → ${change.currentValue}`;
    }).join(', ');

    this.addLog('ngOnChanges', `Inputs cambiaron: ${changeDetails || 'Primera vez'}`, '#ff9800');
    console.log('🔄 ngOnChanges:', changes);
  }

  // === ngOnInit ===
  // Se ejecuta UNA VEZ, después del primer ngOnChanges
  // Lugar ideal para inicializar datos y hacer llamadas HTTP
  ngOnInit(): void {
    this.ngOnInitCalled = true;
    this.addLog('ngOnInit', 'Componente inicializado - Lugar ideal para cargar datos', '#4caf50');
    console.log('✅ ngOnInit: Componente inicializado');
  }

  // === ngDoCheck ===
  // Se ejecuta en cada detección de cambios
  // ⚠️ CUIDADO: Se ejecuta MUY frecuentemente
  ngDoCheck(): void {
    // Comentado para no saturar los logs
    // this.addLog('ngDoCheck', 'Detección de cambios manual', '#03a9f4');
    console.log('🔍 ngDoCheck: Detección de cambios');
  }

  // === ngAfterContentInit ===
  // Se ejecuta UNA VEZ, después de proyectar contenido externo
  // Útil para <ng-content>
  ngAfterContentInit(): void {
    this.addLog('ngAfterContentInit', 'Contenido proyectado inicializado', '#00bcd4');
    console.log('📦 ngAfterContentInit: Contenido inicializado');
  }

  // === ngAfterContentChecked ===
  // Se ejecuta después de cada verificación del contenido proyectado
  ngAfterContentChecked(): void {
    // Comentado para no saturar los logs
    // this.addLog('ngAfterContentChecked', 'Contenido verificado', '#009688');
    console.log('✔️ ngAfterContentChecked: Contenido verificado');
  }

  // === ngAfterViewInit ===
  // Se ejecuta UNA VEZ, después de inicializar la vista
  // Aquí es seguro acceder a @ViewChild y @ViewChildren
  ngAfterViewInit(): void {
    this.ngAfterViewInitCalled = true;
    this.addLog('ngAfterViewInit', 'Vista inicializada - ViewChild disponible', '#3f51b5');
    console.log('👁️ ngAfterViewInit: Vista inicializada');

    // Ejemplo de uso de ViewChild
    if (this.messageInput) {
      console.log('✅ ViewChild disponible:', this.messageInput.nativeElement);
    }
  }

  // === ngAfterViewChecked ===
  // Se ejecuta después de cada verificación de la vista
  ngAfterViewChecked(): void {
    // Comentado para no saturar los logs
    // this.addLog('ngAfterViewChecked', 'Vista verificada', '#673ab7');
    console.log('✔️ ngAfterViewChecked: Vista verificada');
  }

  // === ngOnDestroy ===
  // Se ejecuta UNA VEZ, justo antes de destruir el componente
  // Lugar para limpiar suscripciones, timers, etc.
  ngOnDestroy(): void {
    this.componentAlive = false;
    this.addLog('ngOnDestroy', '💀 Componente destruido - Limpieza realizada', '#f44336');
    console.log('💀 ngOnDestroy: Componente destruido');

    // Limpiar timer si está corriendo
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  // === HELPER METHODS ===
  addLog(hook: string, message: string, color: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.logs.push({ hook, timestamp, message, color });

    // Limitar a 50 logs para no saturar
    if (this.logs.length > 50) {
      this.logs.shift();
    }
  }

  clearLogs(): void {
    this.logs = [];
    console.log('🗑️ Logs limpiados');
  }

  // === DEMO METHODS ===
  startTimer(): void {
    if (this.timerRunning) return;
    
    this.timerRunning = true;
    this.addLog('Timer', '⏱️ Timer iniciado', '#2196f3');

    this.timerInterval = setInterval(() => {
      this.counter++;
      console.log('⏱️ Counter:', this.counter);
    }, 1000);
  }

  stopTimer(): void {
    if (!this.timerRunning) return;
    
    this.timerRunning = false;
    clearInterval(this.timerInterval);
    this.addLog('Timer', '⏸️ Timer detenido', '#ff9800');
  }

  resetTimer(): void {
    this.stopTimer();
    this.counter = 0;
    this.addLog('Timer', '🔄 Timer reseteado', '#9c27b0');
  }

  focusInput(): void {
    if (this.messageInput) {
      this.messageInput.nativeElement.focus();
      this.addLog('ViewChild', '🎯 Input enfocado usando ViewChild', '#4caf50');
    }
  }

  clearMessage(): void {
    this.message = '';
    this.addLog('Action', '✖️ Mensaje limpiado', '#f44336');
  }

  triggerChangeDetection(): void {
    this.externalValue = Math.floor(Math.random() * 100);
    this.addLog('Action', `🔄 Cambio manual: externalValue = ${this.externalValue}`, '#03a9f4');
  }

  simulateDataLoad(): void {
    this.addLog('Action', '⏳ Simulando carga de datos...', '#ff9800');
    
    setTimeout(() => {
      this.addLog('Action', '✅ Datos cargados exitosamente', '#4caf50');
    }, 2000);
  }

  getHookIcon(hook: string): string {
    const icons: { [key: string]: string } = {
      'constructor': '🏗️',
      'ngOnChanges': '🔄',
      'ngOnInit': '✅',
      'ngDoCheck': '🔍',
      'ngAfterContentInit': '📦',
      'ngAfterContentChecked': '✔️',
      'ngAfterViewInit': '👁️',
      'ngAfterViewChecked': '✔️',
      'ngOnDestroy': '💀',
      'Timer': '⏱️',
      'ViewChild': '🎯',
      'Action': '⚡'
    };
    return icons[hook] || '📌';
  }
}
