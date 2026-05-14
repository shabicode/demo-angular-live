# 📝 EJERCICIOS PRÁCTICOS - Angular Routing, Guards y ViewChild

## 📋 ÍNDICE DE EJERCICIOS

### Nivel Básico
1. [Guard Premium](#ejercicio-1-guard-premium)
2. [Scroll Suave con ViewChild](#ejercicio-2-scroll-suave-con-viewchild)
3. [Contador Individual con ViewChildren](#ejercicio-3-contador-individual-con-viewchildren)

### Nivel Intermedio
4. [Formulario con Validación ViewChildren](#ejercicio-4-formulario-con-validación-viewchildren)
5. [Navegación con Breadcrumbs](#ejercicio-5-navegación-con-breadcrumbs)
6. [Tab Component con ContentChildren](#ejercicio-6-tab-component-con-contentchildren)

### Nivel Avanzado
7. [Blog Completo con Lazy Loading](#ejercicio-7-blog-completo-con-lazy-loading)
8. [Sistema de Permisos Multi-Guard](#ejercicio-8-sistema-de-permisos-multi-guard)
9. [Carousel Interactivo](#ejercicio-9-carousel-interactivo)

---

## NIVEL BÁSICO

### EJERCICIO 1: Guard Premium

**🎯 Objetivo:** Crear un guard que verifique si el usuario tiene suscripción premium.

**📚 Conceptos:** Guards, localStorage, navegación programática

**⏱️ Tiempo estimado:** 15 minutos

#### Requisitos

1. Crear un guard `premiumGuard` en `src/app/guards/premium.guard.ts`
2. Verificar si existe `isPremium = 'true'` en localStorage
3. Si NO es premium:
   - Mostrar console.log con mensaje: "⚠️ Acceso solo para usuarios Premium"
   - Redirigir a `/login`
   - Devolver `false`
4. Si ES premium:
   - Mostrar console.log: "✅ Usuario Premium verificado"
   - Devolver `true`
5. Aplicar el guard a la ruta `/demo`

#### Código Base

```typescript
// src/app/guards/premium.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const premiumGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isPremium = localStorage.getItem('isPremium');
  
  // TODO: Implementar la lógica aquí
  
  return true; // Cambiar esta línea
};
```

#### Aplicar el Guard

```typescript
// src/app/app.routes.ts
import { premiumGuard } from './guards/premium.guard';

export const routes: Routes = [
  // ... otras rutas
  { 
    path: 'demo',
    loadComponent: () => import('./demo/demo-wrapper').then(m => m.DemoWrapperComponent),
    canActivate: [premiumGuard] // 👈 Agregar aquí
  },
];
```

#### Testing

**Paso 1:** Ir a http://localhost:4200/demo sin ser premium
- **Resultado esperado:** Redirige a `/login` y muestra el log de advertencia

**Paso 2:** En la consola del navegador ejecutar:
```javascript
localStorage.setItem('isPremium', 'true');
```

**Paso 3:** Ir a `/demo` nuevamente
- **Resultado esperado:** Permite acceso y muestra el log de verificación

#### Solución

<details>
<summary>👁️ Ver solución (intenta hacerlo primero)</summary>

```typescript
// src/app/guards/premium.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const premiumGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isPremium = localStorage.getItem('isPremium');
  
  if (isPremium === 'true') {
    console.log('✅ Usuario Premium verificado');
    return true;
  } else {
    console.log('⚠️ Acceso solo para usuarios Premium');
    router.navigate(['/login']);
    return false;
  }
};
```
</details>

#### 🎓 Bonus Challenge

Modifica el guard para que también redirija a una página `/pricing` si el usuario NO es premium, en lugar de `/login`.

---

### EJERCICIO 2: Scroll Suave con ViewChild

**🎯 Objetivo:** Implementar un botón "Volver arriba" con scroll suave.

**📚 Conceptos:** ViewChild, ElementRef, manipulación del DOM

**⏱️ Tiempo estimado:** 20 minutos

#### Requisitos

1. Editar el componente `Home` en `src/app/home/home.ts`
2. Agregar un `<div #top></div>` al inicio del template
3. Agregar contenido largo (mínimo 2000px de altura)
4. Agregar un botón al final: "⬆️ Volver Arriba"
5. Usar `@ViewChild` para capturar la referencia `#top`
6. Implementar método `volverArriba()` que haga scroll suave

#### Código Base

```typescript
// src/app/home/home.ts
import { Component, ViewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <!-- Agregar referencia #top aquí -->
    <div>TODO: Agregar #top</div>
    
    <div style="text-align: center; padding: 40px;">
      <h1>🏠 Página de Inicio</h1>
      
      <!-- Contenido largo -->
      <div style="height: 2000px; background: linear-gradient(to bottom, #f0f0f0, #e0e0e0);">
        <p style="padding: 20px;">Scroll down para ver el botón...</p>
        <p style="padding: 20px;">⬇️</p>
        <p style="padding: 20px;">⬇️</p>
        <p style="padding: 20px;">⬇️</p>
      </div>
      
      <!-- Botón "Volver arriba" aquí -->
      <button 
        style="padding: 15px 30px; background: #1976d2; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;"
        (click)="volverArriba()">
        ⬆️ Volver Arriba
      </button>
    </div>
  `,
  styleUrl: './home.css',
})
export class Home {
  // TODO: Agregar ViewChild aquí
  
  volverArriba() {
    // TODO: Implementar scroll suave
    // Pista: usar .scrollIntoView({ behavior: 'smooth' })
  }
}
```

#### Pistas

- El método `scrollIntoView()` acepta opciones: `{ behavior: 'smooth' }`
- No olvides implementar `AfterViewInit` para usar ViewChild correctamente
- Accede al elemento con `.nativeElement`

#### Testing

1. Cargar http://localhost:4200/
2. Hacer scroll hasta abajo
3. Click en "⬆️ Volver Arriba"
4. **Resultado esperado:** Scroll suave hasta el inicio

#### Solución

<details>
<summary>👁️ Ver solución</summary>

```typescript
// src/app/home/home.ts
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <div #top></div>
    
    <div style="text-align: center; padding: 40px;">
      <h1>🏠 Página de Inicio</h1>
      
      <div style="height: 2000px; background: linear-gradient(to bottom, #f0f0f0, #e0e0e0);">
        <p style="padding: 20px;">Scroll down para ver el botón...</p>
      </div>
      
      <button 
        style="padding: 15px 30px; background: #1976d2; color: white; border: none; border-radius: 4px; cursor: pointer;"
        (click)="volverArriba()">
        ⬆️ Volver Arriba
      </button>
    </div>
  `,
  styleUrl: './home.css',
})
export class Home implements AfterViewInit {
  @ViewChild('top') topElement!: ElementRef;
  
  ngAfterViewInit() {
    console.log('✅ ViewChild "top" listo');
  }
  
  volverArriba() {
    this.topElement.nativeElement.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    console.log('🚀 Scroll suave activado');
  }
}
```
</details>

#### 🎓 Bonus Challenge

Agrega un botón flotante que solo aparece cuando has hecho scroll más de 300px. Usa `@HostListener('window:scroll')` para detectar el scroll.

---

### EJERCICIO 3: Contador Individual con ViewChildren

**🎯 Objetivo:** Cada caja tiene su propio contador de clicks.

**📚 Conceptos:** ViewChildren, QueryList, event listeners

**⏱️ Tiempo estimado:** 25 minutos

#### Requisitos

1. Editar `src/app/demo/demo.ts`
2. Agregar variable `clickCounts = [0, 0, 0]`
3. Modificar el template para mostrar el contador en cada caja
4. Al hacer click en UNA caja, incrementar SOLO su contador
5. Usar `@ViewChildren` para agregar event listeners después de `ngAfterViewInit`

#### Código Base

```typescript
// Agregar en src/app/demo/demo.ts

clickCounts = [0, 0, 0];

ngAfterViewInit() {
  // ... código existente
  
  // TODO: Agregar event listeners a cada caja
  this.cajas.forEach((caja, index) => {
    // Pista: addEventListener('click', ...)
  });
}
```

#### Template a Modificar

```html
<!-- Modificar la sección de ViewChildren en demo.ts -->
<div style="display: flex; gap: 10px; margin: 20px 0;">
  <div #caja *ngFor="let num of [1,2,3]; let i = index" 
       style="padding: 20px; border: 2px solid #ddd; width: 100px; text-align: center; cursor: pointer;">
    Caja {{ num }}
    <!-- TODO: Mostrar clickCounts[i] aquí -->
    <div style="margin-top: 10px; font-weight: bold; color: #1976d2;">
      Clicks: ???
    </div>
  </div>
</div>
```

#### Pistas

- En el event listener, necesitas actualizar `this.clickCounts[index]++`
- Después de actualizar el array, llama a `this.changeDetectorRef.detectChanges()` o usa un método que dispare change detection
- Otra opción: hacer una copia del array: `this.clickCounts = [...this.clickCounts]`

#### Testing

1. Ir a http://localhost:4200/demo
2. Hacer click en la Caja 1 tres veces
3. Hacer click en la Caja 2 dos veces
4. Hacer click en la Caja 3 una vez
5. **Resultado esperado:**
   - Caja 1: Clicks: 3
   - Caja 2: Clicks: 2
   - Caja 3: Clicks: 1

#### Solución

<details>
<summary>👁️ Ver solución</summary>

```typescript
// src/app/demo/demo.ts (agregar estas partes)

export class DemoComponent implements AfterViewInit {
  @ViewChildren('caja') cajas!: QueryList<ElementRef>;
  clickCounts = [0, 0, 0];
  
  ngAfterViewInit() {
    console.log('✅ ViewChildren listo:', this.cajas.length, 'cajas');
    
    // Agregar event listeners
    this.cajas.forEach((caja, index) => {
      caja.nativeElement.addEventListener('click', () => {
        this.clickCounts[index]++;
        // Forzar detección de cambios
        this.clickCounts = [...this.clickCounts];
        console.log(`📊 Caja ${index + 1}: ${this.clickCounts[index]} clicks`);
      });
    });
  }
  
  // ... resto del código
}
```

Template:
```html
<div #caja *ngFor="let num of [1,2,3]; let i = index" 
     style="padding: 20px; border: 2px solid #ddd; width: 100px; text-align: center; cursor: pointer;">
  Caja {{ num }}
  <div style="margin-top: 10px; font-weight: bold; color: #1976d2;">
    Clicks: {{ clickCounts[i] }}
  </div>
</div>
```
</details>

#### 🎓 Bonus Challenge

Agrega un botón "Reset Todos" que ponga todos los contadores en 0.

---

## NIVEL INTERMEDIO

### EJERCICIO 4: Formulario con Validación ViewChildren

**🎯 Objetivo:** Validar múltiples inputs usando ViewChildren.

**📚 Conceptos:** ViewChildren, validación de formularios, manipulación de elementos

**⏱️ Tiempo estimado:** 30 minutos

#### Requisitos

1. Crear componente `FormValidationComponent`
2. Crear un formulario con 4 inputs: nombre, email, teléfono, mensaje
3. Usar ViewChildren para capturar todos los inputs
4. Al enviar el formulario:
   - Validar que ningún campo esté vacío
   - Si hay campos vacíos, resaltarlos en rojo
   - Enfocar el primer campo inválido
   - Mostrar mensaje de error
5. Si todos son válidos, mostrar mensaje de éxito

#### Estructura

```bash
ng g c components/form-validation --standalone
```

#### Código Base

```typescript
// src/app/components/form-validation/form-validation.component.ts
import { Component, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-validation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="max-width: 500px; margin: 50px auto; padding: 30px; border: 1px solid #ddd; border-radius: 8px;">
      <h2>📋 Formulario de Contacto</h2>
      
      <form (submit)="onSubmit($event)">
        <div style="margin-bottom: 15px;">
          <label>Nombre:</label>
          <input #formInput type="text" name="nombre" 
                 style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
        </div>
        
        <!-- TODO: Agregar inputs para email, teléfono, mensaje -->
        
        <button type="submit" 
                style="width: 100%; padding: 15px; background: #1976d2; color: white; border: none; border-radius: 4px; cursor: pointer;">
          ✅ Enviar
        </button>
      </form>
      
      <div *ngIf="mensajeError" 
           style="margin-top: 20px; padding: 15px; background: #ffebee; color: #c62828; border-radius: 4px;">
        {{ mensajeError }}
      </div>
      
      <div *ngIf="mensajeExito" 
           style="margin-top: 20px; padding: 15px; background: #e8f5e9; color: #2e7d32; border-radius: 4px;">
        {{ mensajeExito }}
      </div>
    </div>
  `
})
export class FormValidationComponent implements AfterViewInit {
  @ViewChildren('formInput') inputs!: QueryList<ElementRef<HTMLInputElement>>;
  
  mensajeError = '';
  mensajeExito = '';
  
  ngAfterViewInit() {
    console.log('Total inputs:', this.inputs.length);
  }
  
  onSubmit(event: Event) {
    event.preventDefault();
    
    // TODO: Implementar validación
    // 1. Limpiar estilos previos
    // 2. Validar cada input
    // 3. Si hay errores, resaltar y enfocar
    // 4. Si todo ok, mostrar éxito
  }
}
```

#### Pistas

```typescript
// Validar un input
const value = input.nativeElement.value.trim();
const isEmpty = value === '';

// Resaltar en rojo
input.nativeElement.style.borderColor = 'red';

// Limpiar estilo
input.nativeElement.style.borderColor = '';

// Enfocar
input.nativeElement.focus();
```

#### Testing

1. Llenar solo 2 de los 4 campos
2. Click en "Enviar"
3. **Resultado esperado:**
   - Campos vacíos se resaltan en rojo
   - Cursor en el primer campo vacío
   - Mensaje: "⚠️ Por favor completa todos los campos"

4. Llenar todos los campos
5. Click en "Enviar"
6. **Resultado esperado:**
   - Todos los bordes vuelven a normal
   - Mensaje: "✅ Formulario enviado correctamente"

#### Solución

<details>
<summary>👁️ Ver solución</summary>

```typescript
import { Component, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-validation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="max-width: 500px; margin: 50px auto; padding: 30px; border: 1px solid #ddd; border-radius: 8px;">
      <h2>📋 Formulario de Contacto</h2>
      
      <form (submit)="onSubmit($event)">
        <div style="margin-bottom: 15px;">
          <label>Nombre:</label>
          <input #formInput type="text" name="nombre" 
                 style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
        </div>
        
        <div style="margin-bottom: 15px;">
          <label>Email:</label>
          <input #formInput type="email" name="email" 
                 style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
        </div>
        
        <div style="margin-bottom: 15px;">
          <label>Teléfono:</label>
          <input #formInput type="tel" name="telefono" 
                 style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
        </div>
        
        <div style="margin-bottom: 15px;">
          <label>Mensaje:</label>
          <textarea #formInput name="mensaje" rows="4"
                    style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;"></textarea>
        </div>
        
        <button type="submit" 
                style="width: 100%; padding: 15px; background: #1976d2; color: white; border: none; border-radius: 4px; cursor: pointer;">
          ✅ Enviar
        </button>
      </form>
      
      <div *ngIf="mensajeError" 
           style="margin-top: 20px; padding: 15px; background: #ffebee; color: #c62828; border-radius: 4px;">
        {{ mensajeError }}
      </div>
      
      <div *ngIf="mensajeExito" 
           style="margin-top: 20px; padding: 15px; background: #e8f5e9; color: #2e7d32; border-radius: 4px;">
        {{ mensajeExito }}
      </div>
    </div>
  `
})
export class FormValidationComponent implements AfterViewInit {
  @ViewChildren('formInput') inputs!: QueryList<ElementRef<HTMLInputElement>>;
  
  mensajeError = '';
  mensajeExito = '';
  
  ngAfterViewInit() {
    console.log('Total inputs:', this.inputs.length);
  }
  
  onSubmit(event: Event) {
    event.preventDefault();
    
    // Limpiar mensajes
    this.mensajeError = '';
    this.mensajeExito = '';
    
    // Limpiar estilos previos
    this.inputs.forEach(input => {
      input.nativeElement.style.borderColor = '';
    });
    
    // Validar
    const camposVacios: ElementRef<HTMLInputElement>[] = [];
    
    this.inputs.forEach(input => {
      const value = input.nativeElement.value.trim();
      if (value === '') {
        camposVacios.push(input);
        input.nativeElement.style.borderColor = 'red';
      }
    });
    
    if (camposVacios.length > 0) {
      this.mensajeError = `⚠️ Por favor completa todos los campos (${camposVacios.length} vacíos)`;
      camposVacios[0].nativeElement.focus();
    } else {
      this.mensajeExito = '✅ Formulario enviado correctamente';
      console.log('📧 Formulario válido');
    }
  }
}
```
</details>

---

### EJERCICIO 5: Navegación con Breadcrumbs

**🎯 Objetivo:** Crear un breadcrumb dinámico basado en la ruta activa.

**📚 Conceptos:** ActivatedRoute, Router events, rutas hijas

**⏱️ Tiempo estimado:** 35 minutos

#### Requisitos

1. Crear componente `BreadcrumbComponent`
2. Mostrar breadcrumbs dinámicos según la ruta:
   - `/` → Home
   - `/cursos` → Home / Cursos
   - `/cursos/1` → Home / Cursos / Angular Básico
3. Breadcrumbs clickeables (con routerLink)
4. Resaltar el breadcrumb actual

#### Código Base

```typescript
// src/app/components/breadcrumb/breadcrumb.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { filter } from 'rxjs';

interface Breadcrumb {
  label: string;
  url: string;
  active: boolean;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav style="padding: 15px; background: #f5f5f5; border-bottom: 1px solid #ddd;">
      <div style="display: flex; gap: 10px; align-items: center;">
        <a routerLink="/" style="text-decoration: none; color: #1976d2;">
          🏠 Home
        </a>
        
        <ng-container *ngFor="let breadcrumb of breadcrumbs; let last = last">
          <span style="color: #999;">></span>
          
          <a *ngIf="!last" 
             [routerLink]="breadcrumb.url" 
             style="text-decoration: none; color: #1976d2;">
            {{ breadcrumb.label }}
          </a>
          
          <span *ngIf="last" style="color: #666; font-weight: bold;">
            {{ breadcrumb.label }}
          </span>
        </ng-container>
      </div>
    </nav>
  `
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  
  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
      });
      
    // Crear breadcrumbs iniciales
    this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
  }
  
  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    // TODO: Implementar lógica recursiva para crear breadcrumbs
    
    return breadcrumbs;
  }
}
```

#### Pistas

Para obtener la ruta actual:
```typescript
const children = route.children;
const routeURL = route.snapshot.url.map(segment => segment.path).join('/');
```

#### Agregar al app.component.ts

```typescript
// src/app/app.ts
template: `
  <nav><!-- ... --></nav>
  <app-breadcrumb></app-breadcrumb>  👈 Agregar
  <router-outlet></router-outlet>
`
```

---

### EJERCICIO 6: Tab Component con ContentChildren

**🎯 Objetivo:** Crear un componente de tabs reutilizable usando content projection.

**📚 Conceptos:** ContentChildren, ng-content, proyección de contenido

**⏱️ Tiempo estimado:** 40 minutos

#### Requisitos

1. Crear dos componentes:
   - `TabsComponent` (contenedor)
   - `TabComponent` (tab individual)
2. `TabsComponent` usa `@ContentChildren` para detectar los tabs
3. Mostrar solo el contenido del tab activo
4. Permitir cambiar de tab

#### Estructura

```bash
ng g c components/tabs --standalone
ng g c components/tab --standalone
```

#### Código Base

**TabComponent:**
```typescript
// src/app/components/tab/tab.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="active" style="padding: 20px;">
      <ng-content></ng-content>
    </div>
  `
})
export class TabComponent {
  @Input() title = '';
  @Input() active = false;
}
```

**TabsComponent (base):**
```typescript
// src/app/components/tabs/tabs.component.ts
import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
      <!-- Cabecera de tabs -->
      <div style="display: flex; background: #f5f5f5; border-bottom: 1px solid #ddd;">
        <!-- TODO: Iterar sobre tabs y crear botones -->
      </div>
      
      <!-- Contenido de tabs -->
      <div>
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;
  
  ngAfterContentInit() {
    // TODO: Activar el primer tab por defecto
  }
  
  selectTab(tab: TabComponent) {
    // TODO: Desactivar todos, activar el seleccionado
  }
}
```

#### Uso esperado

```typescript
// En cualquier componente
<app-tabs>
  <app-tab title="Tab 1">Contenido del Tab 1</app-tab>
  <app-tab title="Tab 2">Contenido del Tab 2</app-tab>
  <app-tab title="Tab 3">Contenido del Tab 3</app-tab>
</app-tabs>
```

#### Testing

1. Renderizar tabs en un componente
2. Al iniciar, solo Tab 1 debe ser visible
3. Click en Tab 2 → Solo Tab 2 visible
4. Click en Tab 3 → Solo Tab 3 visible

---

## NIVEL AVANZADO

### EJERCICIO 7: Blog Completo con Lazy Loading

**🎯 Objetivo:** Crear un módulo de blog completo con lazy loading y guards.

**📚 Conceptos:** Lazy loading, guards, rutas hijas, CRUD básico

**⏱️ Tiempo estimado:** 60-90 minutos

#### Estructura esperada

```
src/app/blog/
├── blog.routes.ts
├── blog-list/
│   └── blog-list.component.ts
├── blog-detail/
│   └── blog-detail.component.ts
├── blog-create/
│   └── blog-create.component.ts (protegido)
├── blog-edit/
│   └── blog-edit.component.ts (protegido)
└── guards/
    └── author.guard.ts
```

#### Requisitos

1. **Rutas:**
   - `/blog` → Lista de posts (público)
   - `/blog/:id` → Detalle de post (público)
   - `/blog/create` → Crear post (requiere login + rol author)
   - `/blog/edit/:id` → Editar post (requiere login + rol author)

2. **authorGuard:**
   - Verificar `auth_token` en localStorage
   - Verificar `user_role === 'author' || user_role === 'admin'`
   - Si no cumple, redirigir a `/login` con mensaje

3. **blog-create.component:**
   - Formulario con: título, contenido
   - Usar `@ViewChild` para auto-focus en el título
   - Guardar en localStorage (simulación)

4. **Lazy Loading:**
   - Toda la sección blog debe cargarse con `loadChildren`

#### Paso 1: Crear estructura

```bash
ng g c blog/blog-list --standalone
ng g c blog/blog-detail --standalone
ng g c blog/blog-create --standalone
ng g c blog/blog-edit --standalone
```

#### Paso 2: author.guard.ts

```typescript
// src/app/blog/guards/author.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authorGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('auth_token');
  const role = localStorage.getItem('user_role');
  
  // TODO: Implementar verificación
  
  return true;
};
```

#### Paso 3: blog.routes.ts

```typescript
// src/app/blog/blog.routes.ts
import { Routes } from '@angular/router';
import { authorGuard } from './guards/author.guard';

export const BLOG_ROUTES: Routes = [
  // TODO: Configurar rutas aquí
];
```

#### Paso 4: Aplicar lazy loading en app.routes.ts

```typescript
// src/app/app.routes.ts
{
  path: 'blog',
  loadChildren: () => import('./blog/blog.routes').then(m => m.BLOG_ROUTES)
}
```

#### Bonus Features

- Agregar paginación en la lista
- Implementar búsqueda de posts
- Agregar categorías
- Sistema de comentarios

---

### EJERCICIO 8: Sistema de Permisos Multi-Guard

**🎯 Objetivo:** Crear un sistema de guards combinables para diferentes niveles de permisos.

**⏱️ Tiempo estimado:** 45 minutos

#### Requisitos

Crear 4 guards que se puedan combinar:
1. `authGuard` → Verifica login
2. `roleGuard` → Verifica rol específico
3. `premiumGuard` → Verifica suscripción
4. `featureGuard` → Verifica acceso a feature específico

#### Uso esperado

```typescript
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [authGuard]
},
{
  path: 'admin',
  component: AdminComponent,
  canActivate: [authGuard, roleGuard]
},
{
  path: 'premium-content',
  component: PremiumComponent,
  canActivate: [authGuard, premiumGuard]
}
```

---

### EJERCICIO 9: Carousel Interactivo

**🎯 Objetivo:** Crear un carousel de imágenes usando ViewChildren.

**⏱️ Tiempo estimado:** 50 minutos

#### Requisitos

1. Componente con array de imágenes
2. Mostrar solo 1 imagen a la vez
3. Botones: Anterior / Siguiente
4. Usar `@ViewChildren` para capturar todas las imágenes
5. Hacer scroll automático a la imagen activa con `scrollIntoView`
6. Auto-play (opcional): cambia cada 3 segundos

---

## 📊 EVALUACIÓN

### Criterios de Evaluación

| Criterio | Puntos |
|----------|--------|
| Código funcional | 40% |
| Buenas prácticas | 30% |
| Type safety | 15% |
| Claridad del código | 15% |

### Checklist de Buenas Prácticas

- [ ] Usa `@ViewChild` en lugar de `document.querySelector`
- [ ] Implementa lifecycle hooks correctamente
- [ ] Guards devuelven `true`/`false` apropiadamente
- [ ] Lazy loading aplicado a módulos grandes
- [ ] Código tipado (sin `any`)
- [ ] Nombres descriptivos de variables y funciones
- [ ] Comentarios en código complejo
- [ ] Console.logs para debugging

---

## 🎓 RECURSOS DE APOYO

### Documentación

- [Angular Router](https://angular.dev/guide/routing)
- [Guards](https://angular.dev/guide/router#preventing-unauthorized-access)
- [ViewChild](https://angular.dev/api/core/ViewChild)
- [ContentChild](https://angular.dev/api/core/ContentChild)

### Videos

- [Angular University - Routing](https://www.youtube.com/watch?v=Nehk4tBxD4o)
- [Decoded Frontend - ViewChild](https://www.youtube.com/watch?v=BzRBD5ZmZRw)

---

## ✅ SOLUCIONES COMPLETAS

Las soluciones completas de todos los ejercicios están disponibles en el repositorio:

```
demo-angular-live/SOLUTIONS/
├── ejercicio-1-premium-guard/
├── ejercicio-2-scroll-viewchild/
├── ejercicio-3-contador-viewchildren/
└── ...
```

**📌 TIP:** Intenta resolverlos primero antes de ver las soluciones. ¡Es la única forma de aprender de verdad!

---

**🎉 ¡Buena suerte con los ejercicios! 🎉**
