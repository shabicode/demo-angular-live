import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { interval, of, fromEvent, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { map, filter, tap, switchMap, mergeMap, debounceTime, distinctUntilChanged, take, takeUntil, catchError, combineLatestWith } from 'rxjs/operators';

interface LogEntry {
  operator: string;
  message: string;
  timestamp: string;
  color: string;
}

@Component({
  selector: 'app-rxjs-operators-example',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rxjs-operators-example.html',
  styleUrls: ['./rxjs-operators-example.css']
})
export class RxjsOperatorsExampleComponent implements OnInit, OnDestroy {
  
  // Array de logs para mostrar operaciones
  logs: LogEntry[] = [];

  // Subject para unsubscribe
  private destroy$ = new Subject<void>();

  // Subjects para demos
  searchSubject$ = new Subject<string>();
  clickSubject$ = new Subject<string>();

  // Estados
  searchTerm = '';
  counter = 0;
  isObservableRunning = false;
  temperature = 20;

  // Resultados
  mapResults: number[] = [];
  filterResults: number[] = [];
  searchResults: string[] = [];
  switchMapResult = '';
  mergeMapResults: string[] = [];
  combineLatestResult = '';

  // === CONSTRUCTOR ===
  constructor() {
    this.addLog('constructor', '🏗️ Componente RxJS Operators creado', '#9c27b0');
  }

  // === ngOnInit ===
  ngOnInit(): void {
    this.addLog('ngOnInit', '✅ Componente inicializado', '#4caf50');
    this.setupSearchWithDebounce();
    this.setupClickListener();
  }

  // === ngOnDestroy ===
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.addLog('ngOnDestroy', '💀 Limpieza de suscripciones', '#f44336');
  }

  // === DEMO 1: map() ===
  demoMap(): void {
    this.addLog('map', '🗺️ Iniciando demo de map()', '#1976d2');
    this.mapResults = [];

    of(1, 2, 3, 4, 5)
      .pipe(
        map(x => x * 10),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (value) => {
          this.mapResults.push(value);
          this.addLog('map', `Valor transformado: ${value}`, '#1976d2');
        },
        complete: () => {
          this.addLog('map', '✅ map() completado', '#4caf50');
        }
      });
  }

  // === DEMO 2: filter() ===
  demoFilter(): void {
    this.addLog('filter', '🔍 Iniciando demo de filter()', '#ff9800');
    this.filterResults = [];

    of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
      .pipe(
        filter(x => x % 2 === 0), // Solo números pares
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (value) => {
          this.filterResults.push(value);
          this.addLog('filter', `Número par: ${value}`, '#ff9800');
        },
        complete: () => {
          this.addLog('filter', '✅ filter() completado', '#4caf50');
        }
      });
  }

  // === DEMO 3: tap() ===
  demoTap(): void {
    this.addLog('tap', '👁️ Iniciando demo de tap()', '#e91e63');

    of('Angular', 'React', 'Vue')
      .pipe(
        tap(framework => this.addLog('tap', `🔍 Espiando: ${framework}`, '#e91e63')),
        map(framework => framework.toUpperCase()),
        tap(framework => this.addLog('tap', `🔍 Después de map: ${framework}`, '#e91e63')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (value) => {
          this.addLog('tap', `✅ Resultado final: ${value}`, '#4caf50');
        }
      });
  }

  // === DEMO 4: debounceTime() ===
  setupSearchWithDebounce(): void {
    this.searchSubject$
      .pipe(
        debounceTime(500), // Espera 500ms después del último evento
        distinctUntilChanged(), // Solo si el valor cambió
        tap(term => this.addLog('debounceTime', `🔍 Buscando: "${term}"`, '#00bcd4')),
        takeUntil(this.destroy$)
      )
      .subscribe(term => {
        // Simular búsqueda
        this.searchResults = this.simulateSearch(term);
        this.addLog('debounceTime', `✅ Encontrados ${this.searchResults.length} resultados`, '#4caf50');
      });
  }

  onSearchChange(term: string): void {
    this.searchSubject$.next(term);
    this.addLog('debounceTime', '⌨️ Tecla presionada (esperando 500ms...)', '#9e9e9e');
  }

  simulateSearch(term: string): string[] {
    const items = ['Angular', 'React', 'Vue', 'Svelte', 'Ember', 'Backbone', 'Knockout', 'Meteor'];
    return items.filter(item => item.toLowerCase().includes(term.toLowerCase()));
  }

  // === DEMO 5: switchMap() ===
  demoSwitchMap(): void {
    this.addLog('switchMap', '🔄 Iniciando demo de switchMap()', '#9c27b0');
    this.switchMapResult = 'Buscando...';

    // Simular búsqueda que cancela la anterior
    of('Angular')
      .pipe(
        tap(() => this.addLog('switchMap', '📤 Petición 1: "Angular"', '#9c27b0')),
        switchMap(term => this.simulateApiCall(term)),
        takeUntil(this.destroy$)
      )
      .subscribe(result => {
        this.switchMapResult = result;
        this.addLog('switchMap', `✅ Resultado: ${result}`, '#4caf50');
      });

    // Segunda petición que cancelará la primera
    setTimeout(() => {
      of('React')
        .pipe(
          tap(() => this.addLog('switchMap', '📤 Petición 2: "React" (cancela la anterior)', '#ff9800')),
          switchMap(term => this.simulateApiCall(term)),
          takeUntil(this.destroy$)
        )
        .subscribe(result => {
          this.switchMapResult = result;
          this.addLog('switchMap', `✅ Resultado final: ${result}`, '#4caf50');
        });
    }, 100);
  }

  simulateApiCall(term: string) {
    return new Promise<string>(resolve => {
      setTimeout(() => {
        resolve(`Datos de ${term} obtenidos de la API`);
      }, 1000);
    });
  }

  // === DEMO 6: mergeMap() ===
  demoMergeMap(): void {
    this.addLog('mergeMap', '🔀 Iniciando demo de mergeMap()', '#673ab7');
    this.mergeMapResults = [];

    of('Request 1', 'Request 2', 'Request 3')
      .pipe(
        mergeMap(request => {
          this.addLog('mergeMap', `📤 ${request} iniciado`, '#673ab7');
          return this.simulateRequest(request);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(result => {
        this.mergeMapResults.push(result);
        this.addLog('mergeMap', `✅ ${result}`, '#4caf50');
      });
  }

  simulateRequest(name: string) {
    const delay = Math.random() * 2000;
    return new Promise<string>(resolve => {
      setTimeout(() => {
        resolve(`${name} completado`);
      }, delay);
    });
  }

  // === DEMO 7: interval con take() ===
  demoInterval(): void {
    if (this.isObservableRunning) return;
    
    this.isObservableRunning = true;
    this.counter = 0;
    this.addLog('interval', '⏱️ Iniciando contador cada 1 segundo', '#03a9f4');

    interval(1000)
      .pipe(
        take(5), // Solo 5 emisiones
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (value) => {
          this.counter = value + 1;
          this.addLog('interval', `⏱️ Contador: ${this.counter}`, '#03a9f4');
        },
        complete: () => {
          this.isObservableRunning = false;
          this.addLog('interval', '✅ Contador completado', '#4caf50');
        }
      });
  }

  // === DEMO 8: catchError() ===
  demoCatchError(): void {
    this.addLog('catchError', '🚨 Iniciando demo de catchError()', '#f44336');

    of(1, 2, 3, 4, 5)
      .pipe(
        map(x => {
          if (x === 3) {
            throw new Error('Error en el número 3');
          }
          return x * 10;
        }),
        catchError((error) => {
          this.addLog('catchError', `❌ Error capturado: ${error.message}`, '#f44336');
          this.addLog('catchError', '🔄 Continuando con valor por defecto', '#ff9800');
          return of(999); // Valor por defecto
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (value) => {
          this.addLog('catchError', `✅ Valor: ${value}`, '#4caf50');
        }
      });
  }

  // === DEMO 9: combineLatest ===
  demoCombineLatest(): void {
    this.addLog('combineLatest', '🔗 Iniciando demo de combineLatest', '#795548');

    const temperature$ = of(20, 22, 25);
    const humidity$ = of(60, 65, 70);

    temperature$
      .pipe(
        combineLatestWith(humidity$),
        takeUntil(this.destroy$)
      )
      .subscribe(([temp, humidity]) => {
        this.combineLatestResult = `${temp}°C, ${humidity}% humedad`;
        this.addLog('combineLatest', `🌡️ ${this.combineLatestResult}`, '#795548');
      });
  }

  // === DEMO 10: Click listener ===
  setupClickListener(): void {
    this.clickSubject$
      .pipe(
        tap(text => this.addLog('Subject', `🖱️ Click en: ${text}`, '#607d8b')),
        debounceTime(300),
        takeUntil(this.destroy$)
      )
      .subscribe(text => {
        this.addLog('Subject', `✅ Evento procesado: ${text}`, '#4caf50');
      });
  }

  onButtonClick(text: string): void {
    this.clickSubject$.next(text);
  }

  // === HELPER METHODS ===
  addLog(operator: string, message: string, color: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.logs.push({ operator, timestamp, message, color });

    // Limitar a 100 logs
    if (this.logs.length > 100) {
      this.logs.shift();
    }

    // Auto-scroll al final
    setTimeout(() => {
      const logsContainer = document.querySelector('.logs-container');
      if (logsContainer) {
        logsContainer.scrollTop = logsContainer.scrollHeight;
      }
    }, 100);
  }

  clearLogs(): void {
    this.logs = [];
    console.log('🗑️ Logs limpiados');
  }

  getOperatorIcon(operator: string): string {
    const icons: { [key: string]: string } = {
      'constructor': '🏗️',
      'ngOnInit': '✅',
      'ngOnDestroy': '💀',
      'map': '🗺️',
      'filter': '🔍',
      'tap': '👁️',
      'debounceTime': '⏱️',
      'switchMap': '🔄',
      'mergeMap': '🔀',
      'interval': '⏱️',
      'catchError': '🚨',
      'combineLatest': '🔗',
      'Subject': '🖱️'
    };
    return icons[operator] || '📌';
  }
}
