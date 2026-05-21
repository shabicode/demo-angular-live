import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Topic {
  number: number;
  title: string;
  icon: string;
  items: string[];
  demoRoute?: string;
}

interface Block {
  title: string;
  icon: string;
  color: string;
  time: string;
  topics: Topic[];
  expanded: boolean;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  blocks: Block[] = [
    {
      title: 'NAVEGACIÓN',
      icon: '🗺️',
      color: '#1976d2',
      time: '30 min',
      expanded: true,
      topics: [
        {
          number: 1,
          title: 'Routing Básico',
          icon: '🗺️',
          items: [
            'Configuración de rutas (app.routes.ts)',
            'Router Outlet',
            'Rutas con parámetros',
            'Rutas hijas',
            'Wildcard routes (404)',
            'Redirecciones'
          ]
        },
        {
          number: 2,
          title: 'RouterLink',
          icon: '🔗',
          items: [
            'Enlaces sin recarga',
            'RouterLink con parámetros',
            'Query params',
            'RouterLinkActive',
            'Navegación programática'
          ]
        }
      ]
    },
    {
      title: 'SEGURIDAD Y PERFORMANCE',
      icon: '🛡️',
      color: '#4caf50',
      time: '25 min',
      expanded: false,
      topics: [
        {
          number: 3,
          title: 'Guards',
          icon: '🛡️',
          items: [
            'canActivate',
            'Verificar autenticación',
            'Redirección a login',
            'Guards funcionales'
          ],
          demoRoute: '/login'
        },
        {
          number: 4,
          title: 'Lazy Loading',
          icon: '⚡',
          items: [
            'loadComponent',
            'loadChildren',
            'Code splitting',
            'Optimización de rendimiento'
          ],
          demoRoute: '/demo'
        }
      ]
    },
    {
      title: 'MANIPULACIÓN DEL DOM',
      icon: '🔍',
      color: '#e91e63',
      time: '50 min',
      expanded: false,
      topics: [
        {
          number: 5,
          title: 'ViewChild',
          icon: '🔍',
          items: [
            'Acceso a un elemento del DOM',
            'ElementRef',
            'Referencia a componentes hijos',
            'ngAfterViewInit'
          ],
          demoRoute: '/demo'
        },
        {
          number: 6,
          title: 'ViewChildren',
          icon: '📦',
          items: [
            'Acceso a múltiples elementos',
            'QueryList',
            'Iteración sobre elementos',
            'Changes observable'
          ],
          demoRoute: '/demo'
        },
        {
          number: 7,
          title: 'ContentChild',
          icon: '🎁',
          items: [
            'Proyección de contenido simple',
            'ng-content',
            'Acceso a hijos proyectados',
            'ngAfterContentInit'
          ],
          demoRoute: '/demo'
        },
        {
          number: 8,
          title: 'ContentChildren',
          icon: '🎁',
          items: [
            'Proyección múltiple',
            'QueryList de contenido',
            'Componentes wrapper'
          ],
          demoRoute: '/demo'
        }
      ]
    },
    {
      title: 'ANGULAR MODERNO - SIGNALS',
      icon: '⚡',
      color: '#9c27b0',
      time: '15 min',
      expanded: false,
      topics: [
        {
          number: 9,
          title: 'Signals (v17+)',
          icon: '⚡',
          items: [
            'viewChild() signal',
            'viewChildren() signal',
            'contentChild() signal',
            'contentChildren() signal',
            'Sintaxis moderna vs decoradores'
          ],
          demoRoute: '/demo2'
        },
        {
          number: 10,
          title: 'Standalone Components',
          icon: '🎯',
          items: [
            'Componentes sin módulos',
            'Imports directos',
            'App config moderno'
          ]
        }
      ]
    },
    {
      title: 'CONTROL FLOW MODERNO',
      icon: '🔄',
      color: '#ff9800',
      time: '20 min',
      expanded: false,
      topics: [
        {
          number: 11,
          title: '@if',
          icon: '🔀',
          items: [
            'Renderizado condicional',
            '@else, @else if',
            'Sintaxis moderna vs *ngIf'
          ],
          demoRoute: '/examples/control-flow'
        },
        {
          number: 12,
          title: '@for',
          icon: '🔁',
          items: [
            'Iteración sobre listas',
            'track obligatorio',
            '$index, $first, $last',
            '@empty'
          ],
          demoRoute: '/examples/control-flow'
        },
        {
          number: 13,
          title: '@switch',
          icon: '🔀',
          items: [
            'Múltiples casos',
            '@case, @default'
          ],
          demoRoute: '/examples/control-flow'
        },
        {
          number: 14,
          title: '@let',
          icon: '📝',
          items: [
            'Variables locales en templates',
            'Cálculos inline',
            'Reutilización de expresiones'
          ],
          demoRoute: '/examples/control-flow'
        }
      ]
    },
    {
      title: 'LIFECYCLE HOOKS',
      icon: '🔄',
      color: '#00bcd4',
      time: '25 min',
      expanded: false,
      topics: [
        {
          number: 15,
          title: 'Lifecycle Hooks',
          icon: '🔄',
          items: [
            'constructor',
            'ngOnChanges',
            'ngOnInit',
            'ngDoCheck',
            'ngAfterContentInit',
            'ngAfterContentChecked',
            'ngAfterViewInit',
            'ngAfterViewChecked',
            'ngOnDestroy'
          ],
          demoRoute: '/examples/lifecycle'
        }
      ]
    },
    {
      title: 'FORMULARIOS',
      icon: '📝',
      color: '#f44336',
      time: '25 min',
      expanded: false,
      topics: [
        {
          number: 16,
          title: 'Template-Driven Forms',
          icon: '📝',
          items: [
            'ngModel',
            'FormsModule',
            'Two-way binding',
            'Validación básica'
          ],
          demoRoute: '/examples/forms'
        },
        {
          number: 17,
          title: 'Reactive Forms',
          icon: '⚙️',
          items: [
            'FormControl',
            'FormGroup',
            'FormBuilder',
            'Validators',
            'Validación personalizada'
          ],
          demoRoute: '/examples/forms'
        }
      ]
    },
    {
      title: 'RXJS OBSERVABLES',
      icon: '🌊',
      color: '#00bcd4',
      time: '30 min',
      expanded: false,
      topics: [
        {
          number: 18,
          title: 'RxJS Operators',
          icon: '⚡',
          items: [
            'map - Transformación',
            'filter - Filtrado',
            'tap - Side effects',
            'debounceTime - Anti-rebote',
            'switchMap - Cancelar anterior',
            'mergeMap - Ejecutar en paralelo',
            'catchError - Manejo de errores',
            'combineLatest - Combinar streams',
            'take - Limitar emisiones',
            'takeUntil - Prevenir memory leaks'
          ],
          demoRoute: '/examples/rxjs'
        }
      ]
    },
    {
      title: 'SIGNALS AVANZADO',
      icon: '⚡',
      color: '#9c27b0',
      time: '25 min',
      expanded: false,
      topics: [
        {
          number: 19,
          title: 'Signals Completo',
          icon: '⚡',
          items: [
            'signal() - Valores reactivos',
            'computed() - Valores derivados',
            'effect() - Efectos secundarios',
            '.set() - Establecer valor',
            '.update() - Actualizar valor',
            'Signals con objetos',
            'Signals con arrays',
            'Comparación con RxJS'
          ],
          demoRoute: '/examples/signals'
        }
      ]
    },
    {
      title: 'FORMULARIOS COMPLETO',
      icon: '📝',
      color: '#f44336',
      time: '30 min',
      expanded: false,
      topics: [
        {
          number: 20,
          title: 'Forms Avanzado',
          icon: '📝',
          items: [
            'Template-Driven Forms',
            'Reactive Forms',
            'FormControl',
            'FormGroup',
            'FormBuilder',
            'Validators (required, email, etc.)',
            'Validaciones personalizadas',
            'Estado del formulario',
            'Mensajes de error dinámicos'
          ],
          demoRoute: '/examples/forms'
        }
      ]
    }
  ];

  toggleBlock(block: Block) {
    block.expanded = !block.expanded;
  }

  getTotalTopics(): number {
    return this.blocks.reduce((total, block) => total + block.topics.length, 0);
  }

  getTotalItems(): number {
    return this.blocks.reduce((total, block) => 
      total + block.topics.reduce((topicTotal, topic) => 
        topicTotal + topic.items.length, 0), 0);
  }
}
