# ⚡ REFERENCIA RÁPIDA - Angular Routing, Guards y ViewChild

## 🗺️ ROUTING

### Configuración Básica
```typescript
// app.routes.ts
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: '**', redirectTo: '' }
];
```

### Router Outlet
```typescript
// app.component.ts
template: `<router-outlet></router-outlet>`
```

---

## 🔗 ROUTERLINK

### Sintaxis
```html
<!-- Básico -->
<a routerLink="/home">Home</a>

<!-- Con parámetros -->
<a [routerLink]="['/user', userId]">User</a>

<!-- Con query params -->
<a [routerLink]="['/search']" [queryParams]="{q: 'angular'}">Search</a>

<!-- Relativo -->
<a routerLink="../back">Back</a>

<!-- Clase activa -->
<a routerLink="/home" routerLinkActive="active">Home</a>
```

### Navegación Programática
```typescript
constructor(private router: Router) {}

navigateToUser(id: number) {
  this.router.navigate(['/user', id]);
}

navigateWithQuery() {
  this.router.navigate(['/search'], { 
    queryParams: { q: 'angular', page: 1 }
  });
}
```

---

## 🛡️ GUARDS

### Crear Guard
```typescript
// auth.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  
  if (token) {
    return true;
  }
  
  router.navigate(['/login']);
  return false;
};
```

### Aplicar Guard
```typescript
// app.routes.ts
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [authGuard]
}
```

### Tipos de Guards
```typescript
canActivate: [authGuard]           // Antes de activar
canActivateChild: [authGuard]      // Rutas hijas
canDeactivate: [confirmGuard]      // Antes de salir
canMatch: [roleGuard]              // Antes de match
resolve: { data: dataResolver }    // Pre-cargar datos
```

---

## ⚡ LAZY LOADING

### loadComponent (1 componente)
```typescript
{
  path: 'about',
  loadComponent: () => import('./about/about').then(m => m.AboutComponent)
}
```

### loadChildren (múltiples rutas)
```typescript
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES),
  canActivate: [adminGuard]
}
```

### Archivo de rutas hijas
```typescript
// admin/admin.routes.ts
import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'settings', component: SettingsComponent }
];
```

---

## 🔍 VIEWCHILD (Decoradores)

### Básico
```typescript
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  template: `<input #myInput type="text">`
})
export class MyComponent implements AfterViewInit {
  @ViewChild('myInput') input!: ElementRef;
  
  ngAfterViewInit() {
    this.input.nativeElement.focus();
  }
}
```

### Con Componente
```typescript
@ViewChild(ChildComponent) child!: ChildComponent;

ngAfterViewInit() {
  this.child.someMethod();
}
```

### Opcional
```typescript
@ViewChild('optional') optional?: ElementRef;

ngAfterViewInit() {
  this.optional?.nativeElement.focus();
}
```

---

## 📦 VIEWCHILDREN (Decoradores)

### Básico
```typescript
import { ViewChildren, QueryList } from '@angular/core';

@Component({
  template: `
    <div #box *ngFor="let i of [1,2,3]">Box {{ i }}</div>
    <button (click)="highlightAll()">Highlight</button>
  `
})
export class MyComponent implements AfterViewInit {
  @ViewChildren('box') boxes!: QueryList<ElementRef>;
  
  ngAfterViewInit() {
    console.log('Total boxes:', this.boxes.length);
  }
  
  highlightAll() {
    this.boxes.forEach(box => {
      box.nativeElement.style.background = 'yellow';
    });
  }
}
```

### Métodos de QueryList
```typescript
this.boxes.length           // Cantidad
this.boxes.first            // Primero
this.boxes.last             // Último
this.boxes.toArray()        // Convertir a array
this.boxes.forEach(...)     // Iterar

// Reactivo
this.boxes.changes.subscribe(() => {
  console.log('Lista cambió');
});
```

---

## 🎁 CONTENTCHILD (Decoradores)

### Componente Hijo (recibe contenido)
```typescript
import { ContentChild, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <ng-content select="[header]"></ng-content>
      <ng-content select="[body]"></ng-content>
    </div>
  `
})
export class CardComponent implements AfterContentInit {
  @ContentChild('header') header?: ElementRef;
  
  ngAfterContentInit() {
    console.log('Header:', this.header);
  }
}
```

### Componente Padre (proyecta contenido)
```typescript
@Component({
  template: `
    <app-card>
      <div #header header>Título</div>
      <div body>Contenido</div>
    </app-card>
  `
})
export class ParentComponent {}
```

---

## 🎁 CONTENTCHILDREN (Decoradores)

### Básico
```typescript
import { ContentChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-tabs',
  template: `
    <div class="tabs">
      <ng-content></ng-content>
    </div>
  `
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;
  
  ngAfterContentInit() {
    console.log('Total tabs:', this.tabs.length);
    
    this.tabs.forEach((tab, index) => {
      tab.index = index;
    });
  }
}
```

---

## ⚡ SIGNALS (Angular 17+)

### viewChild
```typescript
import { viewChild, effect } from '@angular/core';

export class MyComponent {
  input = viewChild<ElementRef>('myInput');
  inputRequired = viewChild.required<ElementRef>('myInput');
  
  constructor() {
    effect(() => {
      this.input()?.nativeElement.focus();
    });
  }
  
  focusInput() {
    this.input()?.nativeElement.focus();
  }
}
```

### viewChildren
```typescript
import { viewChildren } from '@angular/core';

export class MyComponent {
  boxes = viewChildren<ElementRef>('box');
  
  highlightAll() {
    this.boxes().forEach(box => {
      box.nativeElement.style.background = 'yellow';
    });
  }
  
  getTotalBoxes() {
    return this.boxes().length;
  }
}
```

### contentChild / contentChildren
```typescript
import { contentChild, contentChildren } from '@angular/core';

export class CardComponent {
  header = contentChild<ElementRef>('header');
  tabs = contentChildren<TabComponent>(TabComponent);
  
  constructor() {
    effect(() => {
      console.log('Tabs count:', this.tabs().length);
    });
  }
}
```

---

## 📊 TABLA COMPARATIVA

### ViewChild vs ContentChild

| Feature | ViewChild | ContentChild |
|---------|-----------|--------------|
| **Busca en** | Tu propio template | Contenido proyectado |
| **Lifecycle** | `ngAfterViewInit` | `ngAfterContentInit` |
| **Uso común** | Manipular tu DOM | Componentes de librería |
| **Ejemplo** | Input focus | Angular Material tabs |

### Decoradores vs Signals

| Feature | Decoradores | Signals |
|---------|-------------|---------|
| **Sintaxis** | `@ViewChild('ref')` | `viewChild('ref')` |
| **Acceso** | `this.ref.nativeElement` | `this.ref()?.nativeElement` |
| **Lifecycle** | `ngAfterViewInit` | `effect()` |
| **Null safety** | `!` o `?` | `?.` natural |
| **Angular** | ≤ 16 | 17+ |

---

## 🎯 CUÁNDO USAR CADA UNO

### Routing
```
✅ App con múltiples vistas
✅ SPA (Single Page Application)
✅ Navegación sin recargas
```

### Guards
```
✅ Rutas que requieren login
✅ Rutas con permisos específicos
✅ Validación antes de acceder
```

### Lazy Loading
```
✅ Módulos grandes opcionales
✅ Funcionalidades admin
✅ Optimización de bundle
```

### ViewChild/ViewChildren
```
✅ Manipular elementos de TU template
✅ Focus, scroll, animaciones
✅ Acceso a elementos HTML o componentes
```

### ContentChild/ContentChildren
```
✅ Crear componentes de librería
✅ Componentes flexibles reutilizables
✅ Contenido proyectado con ng-content
```

---

## ⚠️ ERRORES COMUNES

### ❌ Usar href en lugar de routerLink
```typescript
// ❌ MAL - recarga la página
<a href="/home">Home</a>

// ✅ BIEN - navegación SPA
<a routerLink="/home">Home</a>
```

### ❌ ViewChild en ngOnInit
```typescript
// ❌ MAL - undefined
ngOnInit() {
  this.input.nativeElement.focus(); // Error!
}

// ✅ BIEN - disponible aquí
ngAfterViewInit() {
  this.input.nativeElement.focus();
}
```

### ❌ Olvidar el guard en rutas sensibles
```typescript
// ❌ MAL - sin protección
{ path: 'admin', component: AdminComponent }

// ✅ BIEN - con guard
{ 
  path: 'admin', 
  component: AdminComponent,
  canActivate: [authGuard, adminGuard]
}
```

### ❌ No usar Lazy Loading
```typescript
// ❌ MAL - carga todo al inicio
{ path: 'admin', component: AdminComponent }

// ✅ BIEN - lazy loading
{ 
  path: 'admin',
  loadComponent: () => import('./admin/admin').then(m => m.AdminComponent)
}
```

### ❌ Olvidar el ! en ViewChild
```typescript
// ❌ MAL - error de TypeScript
@ViewChild('input') input: ElementRef;

// ✅ BIEN - le dice a TS que confíe
@ViewChild('input') input!: ElementRef;

// ✅ MEJOR - opcional explícito
@ViewChild('input') input?: ElementRef;
```

---

## 🚀 COMANDOS CLI ÚTILES

```bash
# Crear componente
ng g c nombre-componente

# Crear componente standalone
ng g c nombre-componente --standalone

# Crear guard
ng g guard guards/auth

# Crear servicio
ng g s services/auth

# Servir la app
ng serve

# Build para producción
ng build

# Ejecutar tests
ng test
```

---

## 📝 SNIPPETS ÚTILES

### Guard completo
```typescript
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuthenticated = !!localStorage.getItem('token');
  
  if (!isAuthenticated) {
    router.navigate(['/login'], { 
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
  
  return true;
};
```

### Componente con ViewChild completo
```typescript
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-example',
  standalone: true,
  template: `
    <input #searchInput type="text" placeholder="Search...">
    <button (click)="focus()">Focus</button>
  `
})
export class ExampleComponent implements AfterViewInit {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  
  ngAfterViewInit() {
    this.searchInput.nativeElement.focus();
  }
  
  focus() {
    this.searchInput.nativeElement.focus();
  }
  
  getValue(): string {
    return this.searchInput.nativeElement.value;
  }
}
```

### Componente con Signals completo
```typescript
import { Component, viewChild, effect } from '@angular/core';

@Component({
  selector: 'app-example',
  standalone: true,
  template: `
    <input #searchInput type="text" placeholder="Search...">
    <button (click)="focus()">Focus</button>
  `
})
export class ExampleComponent {
  searchInput = viewChild.required<ElementRef<HTMLInputElement>>('searchInput');
  
  constructor() {
    effect(() => {
      // Auto-focus cuando el componente se monta
      this.searchInput().nativeElement.focus();
    });
  }
  
  focus() {
    this.searchInput().nativeElement.focus();
  }
  
  getValue(): string {
    return this.searchInput().nativeElement.value;
  }
}
```

---

## 🎓 RECURSOS RÁPIDOS

- **Docs:** https://angular.dev
- **Router:** https://angular.dev/guide/routing
- **Signals:** https://angular.dev/guide/signals
- **CLI:** https://angular.dev/cli
- **DevTools:** Chrome extension "Angular DevTools"

---

**📌 TIP:** Imprime esta referencia y tenla a mano mientras codeas.

**🎉 Happy Coding! 🎉**
