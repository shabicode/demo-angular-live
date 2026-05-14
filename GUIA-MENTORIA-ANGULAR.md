# 🎓 GUÍA COMPLETA - Mentoría Angular: Routing, Guards y ViewChild

## 📋 ÍNDICE

1. [Introducción](#introducción)
2. [Routing - Navegación SPA](#1-routing---navegación-spa)
3. [RouterLink - Enlaces Reactivos](#2-routerlink---enlaces-reactivos)
4. [Guards - Seguridad de Rutas](#3-guards---seguridad-de-rutas)
5. [Lazy Loading - Optimización](#4-lazy-loading---optimización)
6. [ViewChild - Un Elemento](#5-viewchild---un-elemento)
7. [ViewChildren - Múltiples Elementos](#6-viewchildren---múltiples-elementos)
8. [ContentChild - Proyección Simple](#7-contentchild---proyección-simple)
9. [ContentChildren - Proyección Múltiple](#8-contentchildren---proyección-múltiple)
10. [Bonus: Signals (Angular 17+)](#9-bonus-signals-angular-17)
11. [Ejercicios Prácticos](#ejercicios-prácticos)
12. [Recursos Adicionales](#recursos-adicionales)

---

## Introducción

Esta guía cubre los **8 conceptos fundamentales** de Angular que todo desarrollador debe dominar:

```
📚 CONCEPTOS ESENCIALES:

BLOQUE 1: NAVEGACIÓN
1. 🗺️ Routing      → Configurar rutas en la app
2. 🔗 RouterLink   → Links que no recargan la página

BLOQUE 2: SEGURIDAD Y PERFORMANCE
3. 🛡️ Guards        → Proteger rutas (login required)
4. ⚡ Lazy Loading → Cargar código bajo demanda

BLOQUE 3: MANIPULACIÓN DEL DOM
5. 🔍 ViewChild     → Acceder a UN elemento del template
6. 📦 ViewChildren  → Acceder a MÚLTIPLES elementos
7. 🎁 ContentChild  → Acceder a UN hijo proyectado
8. 🎁 ContentChildren → Acceder a MÚLTIPLES hijos proyectados
```

---

## 1. ROUTING - Navegación SPA

### ¿Qué es?

**Routing es el sistema que mapea URLs a componentes.**

- `/home` → muestra el componente Home
- `/login` → muestra el componente Login
- `/cursos` → muestra el componente Cursos

Angular detecta el cambio de URL y cambia el componente que se muestra sin recargar la página.

### Analogía del Mundo Real 🏠

Imagina tu casa con varias habitaciones: sala, cocina, cuarto. Cuando te mueves de una a otra, **¿la casa se reconstruye?** No. Solo cambias de habitación.

**Eso es Routing en Angular.** La "casa" es tu app, las "habitaciones" son los componentes. Cambias de vista sin reconstruir todo.

### ¿Dónde se configura?

**Archivo: `src/app/app.routes.ts`**

```typescript
import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login },
    { 
        path: 'cursos',
        loadChildren: () => import('./cursos/cursos.routes').then(m => m.CURSOS_ROUTES),
        canActivate: [authGuard]
    },
    { path: '**', redirectTo: '' }
];
```

**Explicación línea por línea:**
- `path: ''` → Ruta raíz (http://localhost:4200/)
- `component: Home` → Muestra el componente Home
- `path: 'cursos'` → URL http://localhost:4200/cursos
- `loadChildren` → Carga lazy (veremos más adelante)
- `canActivate: [authGuard]` → Protege la ruta con un guard
- `path: '**'` → Wildcard para rutas no encontradas (404)

### ¿Dónde se muestra el componente?

**Archivo: `src/app/app.ts`**

```typescript
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav>
      <a routerLink="/">Home</a>
      <a routerLink="/login">Login</a>
      <a routerLink="/cursos">Cursos</a>
    </nav>
    
    <router-outlet></router-outlet>  👈 Contenedor mágico
  `
})
export class App { }
```

El `<router-outlet>` es el contenedor donde Angular inserta los componentes según la ruta activa.

### Diagrama Visual

```
┌────────────────────────────────┐
│   NAVBAR (Siempre visible)     │
├────────────────────────────────┤
│                                │
│   <router-outlet>              │ ← Aquí cambia el contenido
│   (Home / Login / Cursos)      │
│                                │
└────────────────────────────────┘
```

### ¿Cuándo usarlo?

**Úsalo SIEMPRE que tu app tenga más de una vista:**

✅ App con dashboard + perfil + configuración  
✅ E-commerce (productos, carrito, checkout)  
✅ Blog (home, post, about, contact)  
✅ Sistema administrativo (usuarios, reportes, settings)  
✅ Redes sociales (feed, perfil, mensajes, notificaciones)  

### ¿Por qué usarlo?

**3 razones principales:**

1. **🚀 VELOCIDAD**
   - No recarga toda la página
   - Solo cambia lo necesario
   - Experiencia tipo app nativa

2. **🎯 UX MEJOR**
   - Transiciones suaves
   - Estado se mantiene (variables, formularios)
   - Botón "Atrás" del navegador funciona

3. **♻️ CÓDIGO ORGANIZADO**
   - Un componente por vista
   - Fácil de mantener
   - Fácil de escalar

### Prueba Práctica

1. Abre DevTools → Network tab
2. Navega entre rutas (Home → Login → Cursos)
3. **Resultado:** Cero peticiones HTTP, la página NO se recargó

---

## 2. ROUTERLINK - Enlaces Reactivos

### ¿Qué es?

**RouterLink es una directiva que convierte enlaces normales en navegación SPA.**

- HTML normal: `<a href="/login">` → **Recarga la página completa** ❌
- Angular RouterLink: `<a routerLink="/login">` → **Sin recargas** ✅

Angular intercepta el click y cambia la ruta sin recargar.

### Analogía del Mundo Real 📺

Cuando usas Netflix y das click en "Mi Lista" → "Inicio" → "Buscar", ¿se recarga Netflix cada vez? **No.** Solo cambia la vista.

Eso es RouterLink trabajando (o equivalente en React).

### ¿Dónde se usa?

**En cualquier elemento clickeable del template:**

**Ejemplo 1: Navbar (app.ts)**
```html
<nav style="background: #333; padding: 15px; color: white;">
  <a routerLink="/">Home</a>
  <a routerLink="/login">Login</a>
  <a routerLink="/cursos">Cursos</a>
  <a routerLink="/demo">Demo</a>
</nav>
```

**Ejemplo 2: Botones (home.ts)**
```html
<a routerLink="/login" style="padding: 10px 20px; background: #1976d2; color: white;">
  Ir a Login
</a>
<a routerLink="/cursos" style="padding: 10px 20px; background: #1976d2; color: white;">
  Ver Cursos
</a>
```

### Sintaxis avanzadas

```html
<!-- Básica -->
<a routerLink="/perfil">Mi Perfil</a>

<!-- Con parámetros -->
<a [routerLink]="['/curso', cursoId]">Ver Curso</a>
<!-- Genera: /curso/123 -->

<!-- Navegación relativa -->
<a routerLink="../atras">Volver</a>

<!-- Con query params -->
<a [routerLink]="['/buscar']" [queryParams]="{q: 'angular', page: 1}">
  Buscar Angular
</a>
<!-- Genera: /buscar?q=angular&page=1 -->

<!-- Con clase activa automática -->
<a routerLink="/home" routerLinkActive="active">Home</a>
<!-- Agrega clase 'active' cuando estás en esa ruta -->
```

### ¿Cuándo usarlo?

**Regla simple:**

```
✅ Navegación INTERNA (dentro de tu app)  → routerLink
❌ Navegación EXTERNA (otro sitio web)    → href

Ejemplos:
routerLink="/perfil"               ✅
routerLink="/productos"            ✅
href="https://google.com"          ✅
href="/perfil"                     ❌ (usa routerLink!)
```

### ¿Por qué usarlo?

**Comparación: `href` vs `routerLink`**

| Feature | `<a href="/login">` | `<a routerLink="/login">` |
|---------|---------------------|---------------------------|
| Recarga página | ❌ Sí, recarga completa | ✅ No recarga |
| Mantiene estado | ❌ Se pierde | ✅ Se mantiene |
| Transición | ❌ Flash blanco | ✅ Suave |
| Velocidad | ❌ Lento | ✅ Instantáneo |

### Prueba Práctica

1. Navega por toda la app usando los links del navbar
2. Observa: transición instantánea y suave
3. Resultado: **Esto es RouterLink en acción**

---

## 3. GUARDS - Seguridad de Rutas

### ¿Qué es?

**Un Guard es una función que decide si un usuario puede acceder a una ruta.**

Devuelve:
- `true` → ✅ Usuario puede acceder
- `false` → ❌ Usuario bloqueado (redirige)

### Analogía del Mundo Real 🛡️

Imagina un **club nocturno con un guardia en la puerta** verificando tu ID:

- ¿Tienes 18 años? → **Adelante** ✅
- ¿Menor de edad? → **Fuera** ❌

**Eso es exactamente un Guard en Angular.**

### ¿Dónde se implementa?

**Archivo: `src/app/guards/auth.guard.ts`**

```typescript
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('auth_token');
  
  if (token) { 
    return true;  // ✅ Tiene token, adelante
  } else {
    console.log('Acceso denegado. Redirigiendo a login...');
    router.navigate(['/login']);
    return false; // ❌ Sin token, al login
  }
};
```

**Explicación:**
1. Busca un token en localStorage (simula autenticación)
2. Si HAY token → devuelve `true` (pasa)
3. Si NO HAY token → redirige al login y devuelve `false`

### ¿Cómo se aplica?

**En las rutas (app.routes.ts):**

```typescript
{ 
  path: 'cursos',
  loadChildren: () => import('./cursos/cursos.routes').then(m => m.CURSOS_ROUTES),
  canActivate: [authGuard] // 👈 Aplica el guard aquí
}
```

**Procesamiento:**
1. Usuario intenta ir a `/cursos`
2. Angular ejecuta `authGuard` ANTES de cargar el componente
3. Si devuelve `true` → carga el componente
4. Si devuelve `false` → bloquea y redirige

### Tipos de Guards

| Guard | ¿Cuándo se ejecuta? | Caso de uso |
|-------|---------------------|-------------|
| `canActivate` | Antes de activar la ruta | ¿Usuario logueado? |
| `canActivateChild` | Antes de rutas hijas | Proteger sección completa |
| `canDeactivate` | Antes de salir de la ruta | "¿Guardar cambios?" |
| `canMatch` | Antes de matchear la ruta | Cargar ruta según rol |
| `resolve` | Antes de cargar, trae datos | Pre-cargar datos de API |

**📝 Nota:** En esta mentoría nos enfocamos en `canActivate` que es el más común.

### ¿Cuándo usarlo?

**Úsalo SIEMPRE que tengas rutas que no todos puedan ver:**

```
✅ Rutas que requieren login      → authGuard
✅ Rutas que requieren rol        → roleGuard
✅ Rutas que requieren suscripción → premiumGuard
❌ Página de inicio pública       → Sin guard
❌ Página "Acerca de"             → Sin guard
```

### ¿Por qué usarlo?

**Historia real de seguridad:**

> Una startup creó una app Angular sin Guards. Los usuarios normales podían escribir `/admin` en la URL y acceder al panel de administración. Un usuario eliminó 500 registros de la base de datos por "curiosidad".

**Sin Guards, tu app es insegura.**

**Siempre** protege rutas sensibles. No confíes en que "el usuario no va a adivinar la URL".

### Prueba Práctica

1. **Sin login:** Ir a http://localhost:4200/cursos
   - **Resultado:** Redirige a `/login`
   - **Consola:** "Acceso denegado. Redirigiendo a login..."

2. **Con login:** Hacer login como estudiante
   - Ir a `/cursos` de nuevo
   - **Resultado:** Ahora **sí** permite acceso

---

## 4. LAZY LOADING - Optimización

### ¿Qué es?

**Lazy Loading es cargar código solo cuando se necesita, no todo al inicio.**

- **Sin Lazy Loading:** Descarga TODOS los componentes al iniciar
- **Con Lazy Loading:** Descarga componentes bajo demanda

### Analogía del Mundo Real 📺

Cuando abres **Netflix**, ¿se descargan TODAS las películas y series al dispositivo?

**No.** Solo se descarga:
- Info de las portadas (al inicio)
- El video completo (cuando seleccionas una película)

**Eso es Lazy Loading.** Cargar recursos bajo demanda.

### ¿Dónde se implementa?

**Dos formas en app.routes.ts:**

**Forma 1: `loadComponent` (un solo componente)**
```typescript
{ 
  path: 'demo',
  loadComponent: () => import('./demo/demo-wrapper').then(m => m.DemoWrapperComponent)
}
```

**Forma 2: `loadChildren` (módulo/sub-rutas completas)**
```typescript
{ 
  path: 'cursos',
  loadChildren: () => import('./cursos/cursos.routes').then(m => m.CURSOS_ROUTES)
}
```

### Comparación visual

```typescript
// ❌ SIN LAZY LOADING (carga inmediata)
{ path: 'demo', component: DemoComponent }

// ✅ CON LAZY LOADING (carga bajo demanda)
{ 
  path: 'demo', 
  loadComponent: () => import('./demo/demo').then(m => m.DemoComponent) 
}
```

### Diferencia: loadComponent vs loadChildren

| Feature | `loadComponent` | `loadChildren` |
|---------|-----------------|----------------|
| Uso | Un solo componente standalone | Conjunto de rutas (módulo) |
| Complejidad | Simple | Para features grandes |
| Ejemplo | Página "Acerca de" | Módulo Admin completo |

### Impacto en Performance

**SIN LAZY LOADING:**
```
Bundle inicial: 5 MB
Tiempo de carga: 8 segundos
Incluye código que quizá nunca use
```

**CON LAZY LOADING:**
```
Bundle inicial: 500 KB
Tiempo de carga: 1 segundo
Solo descarga lo que usa
```

### ¿Cuándo usarlo?

**Usa Lazy Loading para:**

```
✅ Secciones grandes que no todos visitan
   - Panel de administración (solo admins)
   - Blog con 20 artículos
   - Módulo de reportes

✅ Funcionalidades opcionales
   - Config avanzada
   - Herramientas de debug
   - Features premium

❌ NO lo uses en:
   - Página de inicio (Home)
   - Login (debe ser rápido)
   - Componentes SIEMPRE usados
```

### ¿Por qué usarlo?

**3 beneficios clave:**

1. **⚡ CARGA INICIAL MÁS RÁPIDA**
   - Menos JavaScript para parsear
   - App "arranca" inmediatamente
   - Mejor First Contentful Paint (FCP)

2. **📊 MENOS ANCHO DE BANDA**
   - Usuario solo descarga lo que usa
   - Importante en móviles con datos limitados
   - Reduce costos de hosting

3. **🎯 MEJOR PERFORMANCE**
   - Menos memoria consumida
   - App más ligera
   - Mejores scores en Lighthouse

### Prueba Práctica (LA MÁS COOL)

1. Abre DevTools → Network tab
2. Filtra por "JS" (solo archivos JavaScript)
3. Navega a `/demo`
4. **¡OBSERVA!** Un nuevo archivo `.js` se descarga **justo ahora**
5. Ese chunk NO estaba en el bundle inicial

**Eso es Lazy Loading en acción visual.**

---

## 5. VIEWCHILD - Un Elemento

### ¿Qué es?

**ViewChild es una forma de obtener una referencia a un elemento del template desde TypeScript.**

En JavaScript vanilla:
```javascript
const input = document.getElementById('myInput');
input.focus();
```

En Angular con ViewChild:
```typescript
@ViewChild('myInput') myInput!: ElementRef;
this.myInput.nativeElement.focus();
```

**Ambos hacen lo mismo, pero ViewChild es type-safe y reactivo.**

### Analogía del Mundo Real 🏷️

Es como **ponerle una etiqueta con nombre** a un elemento:
- Template: "Este input se llama 'searchInput'"
- TypeScript: "Dame el elemento llamado 'searchInput'"
- Angular: "Aquí está ✅"

### ¿Dónde se usa?

**Archivo: `src/app/demo/demo.ts`**

**1. En el template (HTML):**
```html
<input 
  #myInput   👈 Esto es una "template reference variable"
  type="text" 
  placeholder="Haz clic en el botón..."
>
<button (click)="enfocar()">
  🎯 Enfocar
</button>
```

**2. En el componente (TypeScript):**
```typescript
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  template: `...` // El HTML de arriba
})
export class DemoComponent implements AfterViewInit {
  @ViewChild('myInput') myInput!: ElementRef;
  
  ngAfterViewInit() {
    console.log('✅ ViewChild listo:', this.myInput);
  }
  
  enfocar() {
    this.myInput.nativeElement.focus();
    console.log('🎯 Input enfocado');
  }
}
```

### Explicación paso a paso

1. **`#myInput`** → Le pone un nombre/etiqueta al elemento
2. **`@ViewChild('myInput')`** → Busca el elemento con esa referencia
3. **`myInput!: ElementRef`** → Guarda la referencia (el `!` dice "confía, existirá")
4. **`ngAfterViewInit()`** → Lifecycle hook que se ejecuta cuando el template está listo
5. **`enfocar()`** → Método que enfoca el input

### Lifecycle importante: ngAfterViewInit

```typescript
ngAfterViewInit() {
  // ✅ AQUÍ el ViewChild ya está disponible
  console.log(this.myInput); // Funciona
}

ngOnInit() {
  // ❌ AQUÍ el ViewChild es undefined
  console.log(this.myInput); // undefined
}
```

**Regla:** Usa ViewChild en `ngAfterViewInit` o después, nunca en `ngOnInit`.

### Casos de uso reales

```
✅ Enfocar un input automáticamente al cargar
✅ Hacer scroll a una sección específica
✅ Obtener dimensiones de un elemento (width, height)
✅ Reproducir/pausar un video programáticamente
✅ Dibujar en un canvas <canvas>
✅ Manipular un elemento de terceros (mapa, gráfico)
```

### ¿Cuándo usarlo?

**Úsalo cuando necesites interactuar con elementos del DOM que están en TU propio template:**

```
✅ Tu componente tiene un input y quieres enfocarlo
✅ Tu componente tiene un canvas y quieres dibujar
✅ Tu componente tiene un video y quieres controlarlo

❌ Quieres manipular elementos de OTRO componente (usa @Output o servicio)
❌ El elemento está fuera de tu componente (no puedes accederlo)
```

### ¿Por qué usarlo?

**Comparación: querySelector vs ViewChild**

| Feature | `document.getElementById()` | `@ViewChild()` |
|---------|----------------------------|----------------|
| Type-safe | ❌ No | ✅ Sí |
| Reactivo | ❌ No | ✅ Sí |
| Lifecycle | ❌ Manual | ✅ Automático |
| Errores | ❌ Explota en runtime | ✅ Warnings claras |

### Prueba Práctica

1. Ir a http://localhost:4200/demo
2. Ver el input y el botón "Enfocar"
3. Click en el botón
4. **Resultado:** Input recibe focus automáticamente (cursor adentro)
5. **Consola:** "🎯 Input enfocado"

---

## 6. VIEWCHILDREN - Múltiples Elementos

### ¿Qué es?

**ViewChildren es como ViewChild, pero para obtener una lista de elementos en lugar de uno solo.**

- **ViewChild** → Busca UNA aguja en el pajar
- **ViewChildren** → Busca TODAS las agujas en el pajar

### ¿Dónde se usa?

**Archivo: `src/app/demo/demo.ts`**

**1. Template (HTML):**
```html
<div #caja *ngFor="let num of [1,2,3]" 
     style="padding: 20px; border: 2px solid #ddd; width: 100px;">
  Caja {{ num }}
</div>
<button (click)="resaltar()">
  ✨ Resaltar Todas
</button>
```

**Nota:** Las 3 cajas tienen el **mismo** `#caja`. No es error, así funciona ViewChildren.

**2. Componente (TypeScript):**
```typescript
import { QueryList } from '@angular/core';

@Component({...})
export class DemoComponent implements AfterViewInit {
  @ViewChildren('caja') cajas!: QueryList<ElementRef>;
  
  ngAfterViewInit() {
    console.log('✅ ViewChildren listo:', this.cajas.length, 'cajas');
  }
  
  resaltar() {
    this.cajas.forEach(caja => {
      caja.nativeElement.style.background = 'yellow';
      caja.nativeElement.style.transform = 'scale(1.1)';
    });
    console.log('✨ Resaltadas', this.cajas.length, 'cajas');
  }
}
```

### QueryList: La colección reactiva

```typescript
@ViewChildren('caja') cajas!: QueryList<ElementRef>;

// QueryList tiene métodos útiles:
this.cajas.length       // 3
this.cajas.first        // Primera caja
this.cajas.last         // Última caja
this.cajas.toArray()    // Convierte a array normal
this.cajas.forEach(...)  // Itera sobre elementos

// Y es REACTIVO:
this.cajas.changes.subscribe(() => {
  console.log('Lista de cajas cambió!');
});
```

### Casos de uso reales

```
✅ Lista de items generada con *ngFor
✅ Grupo de checkboxes para "seleccionar todos"
✅ Grid de imágenes para aplicar filtros
✅ Tabs para cerrar todos excepto uno
✅ Validar múltiples campos de formulario
✅ Animar varios elementos en conjunto
```

### ¿Cuándo usarlo?

**Cuando necesites manipular múltiples elementos del mismo tipo:**

```
✅ Lista de productos (aplicar descuento a todos)
✅ Cards de cursos (resaltar los favoritos)
✅ Inputs de formulario (validar todos)
✅ Elementos de galería (cambiar filtro a todos)
```

### ¿Por qué usarlo?

**Comparación: querySelectorAll vs ViewChildren**

| Feature | `querySelectorAll('.box')` | `@ViewChildren('box')` |
|---------|---------------------------|------------------------|
| Tipo devuelto | NodeList (no array real) | QueryList (reactivo) |
| Reactivo | ❌ No se actualiza | ✅ Se actualiza automáticamente |
| Type-safe | ❌ No | ✅ Sí |
| Se rompe con cambios | ✅ Sí | ❌ No |

### Prueba Práctica

1. Ya estás en `/demo`
2. Ver las 3 cajas grises
3. Click en "Resaltar Todas"
4. **Resultado:** Las 3 se vuelven amarillas y crecen
5. **Consola:** "✨ Resaltadas 3 cajas"

---

## 7. CONTENTCHILD - Proyección Simple

### ¿Qué es?

Primero, la **gran pregunta:**

**¿Cuál es la diferencia entre ViewChild y ContentChild?**

```
COMPONENTE PADRE:
<app-card>
  <p #proyectado>Este texto viene del PADRE</p>  👈 ContentChild
</app-card>

COMPONENTE HIJO (CardComponent):
template: `
  <div>
    <h2 #interno>Título</h2>  👈 ViewChild
    <ng-content></ng-content>  👈 Aquí se proyecta el contenido
  </div>
`
```

**Regla de oro:**
- **ViewChild** → elementos en TU propio template
- **ContentChild** → elementos que te pasan desde AFUERA (contenido proyectado)

### Analogía del Mundo Real 🎁

Imagina una **caja de regalo:**
- La **caja** es el componente hijo
- El **regalo adentro** es el contenido proyectado

**ViewChild** accede a la caja en sí (la estructura)  
**ContentChild** accede al regalo (lo que pusieron adentro)

### ¿Dónde se usa?

**Componente hijo que RECIBE contenido proyectado:**

**Archivo: `src/app/demo/demo.ts`**

```typescript
import { ContentChild } from '@angular/core';
import { CursoDetalleComponent } from '../cursos/curso-detalle/curso-detalle';

@Component({
  selector: 'app-demo',
  template: `
    <div>
      <h3>Contenido proyectado:</h3>
      <ng-content select="[single]"></ng-content>  👈 Slot para recibir contenido
    </div>
    <button (click)="infoSingle()">
      📊 Mostrar info del ContentChild
    </button>
    <p *ngIf="singleInfo">{{ singleInfo }}</p>
  `
})
export class DemoComponent implements AfterContentInit {
  @ContentChild(CursoDetalleComponent) singleCurso!: CursoDetalleComponent;
  
  singleInfo: string = '';
  
  ngAfterContentInit() {
    console.log('✅ ContentChild listo:', this.singleCurso);
  }
  
  infoSingle() {
    if (this.singleCurso) {
      this.singleInfo = `✅ Detectado: ${this.singleCurso.cursoId}`;
    } else {
      this.singleInfo = '❌ No hay ContentChild proyectado';
    }
  }
}
```

**Componente padre que PROYECTA contenido:**

**Archivo: `src/app/demo/demo-wrapper.ts`**

```typescript
@Component({
  selector: 'app-demo-wrapper',
  template: `
    <app-demo>
      <app-curso-detalle single [cursoId]="1"></app-curso-detalle>  👈 Esto se proyecta
    </app-demo>
  `
})
export class DemoWrapperComponent {}
```

### ng-content: El portal de proyección

```html
<!-- Sin selectores (acepta todo) -->
<ng-content></ng-content>

<!-- Con selector (específico) -->
<ng-content select="[header]"></ng-content>
<ng-content select="[body]"></ng-content>
<ng-content select="[footer]"></ng-content>

<!-- Uso desde el padre -->
<app-card>
  <div header>Título</div>
  <div body>Contenido</div>
  <div footer>Pie</div>
</app-card>
```

### Lifecycle: ngAfterContentInit

```typescript
ngAfterContentInit() {
  // ✅ AQUÍ el ContentChild ya está disponible
  console.log(this.singleCurso); // Funciona
}

ngAfterViewInit() {
  // ⚠️ También funciona, pero mejor usar AfterContentInit
  console.log(this.singleCurso); // Funciona
}

ngOnInit() {
  // ❌ AQUÍ el ContentChild es undefined
  console.log(this.singleCurso); // undefined
}
```

### Casos de uso reales

```
✅ Componente "Card" que acepta contenido personalizado
✅ Componente "Modal" con contenido dinámico
✅ Componente "Tabs" con tabs configurables
✅ Componente "Accordion" con secciones personalizadas
✅ Librerías de UI (Angular Material usa esto mucho)
```

### ¿Cuándo usarlo?

**Úsalo cuando crees componentes de librería flexibles:**

```
✅ Crear componentes reutilizables de librería
✅ Componentes "contenedores" genéricos
✅ Cuando el padre debe controlar el contenido

❌ Aplicaciones normales día a día (usa ViewChild)
❌ Features internos de tu app
```

### ¿Por qué usarlo?

**Hace tus componentes súper flexibles:**

```
❌ Sin Content Projection:
- Componentes rígidos
- 20 @Input diferentes
- No flexible

✅ Con Content Projection:
- Componentes flexibles
- Padre controla contenido
- Máxima reutilización
```

### Comparación con Angular Material

**Así funcionan los componentes de Material:**

```html
<!-- MatTab usa ContentChild para detectar los tabs -->
<mat-tab-group>
  <mat-tab label="Tab 1">Contenido 1</mat-tab>  👈 Proyectado
  <mat-tab label="Tab 2">Contenido 2</mat-tab>  👈 Proyectado
</mat-tab-group>

<!-- MatDialog usa ContentChild para el contenido -->
<mat-dialog-content>
  <p>Este texto se proyecta</p>  👈 Proyectado
</mat-dialog-content>
```

### Prueba Práctica

1. Ir a `/demo`
2. Scroll a sección "ContentChild"
3. Click en "Mostrar info del ContentChild"
4. **Resultado:** "✅ ContentChild detectado: CursoDetalleComponent con ID: 1"

---

## 8. CONTENTCHILDREN - Proyección Múltiple

### ¿Qué es?

**ContentChildren es como ContentChild, pero para obtener TODOS los componentes proyectados.**

- **ContentChild** → Detecta UNO
- **ContentChildren** → Detecta TODOS

### ¿Dónde se usa?

**Archivo: `src/app/demo/demo.ts`**

```typescript
import { ContentChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-demo',
  template: `
    <div>
      <h3>Múltiples componentes proyectados:</h3>
      <ng-content select="[multiple]"></ng-content>
    </div>
    <button (click)="infoMultiple()">
      📊 Contar ContentChildren
    </button>
    <p *ngIf="multipleInfo">{{ multipleInfo }}</p>
  `
})
export class DemoComponent implements AfterContentInit {
  @ContentChildren(CursoDetalleComponent) multiplesCursos!: QueryList<CursoDetalleComponent>;
  
  multipleInfo: string = '';
  
  ngAfterContentInit() {
    console.log('✅ ContentChildren:', this.multiplesCursos.length);
  }
  
  infoMultiple() {
    const count = this.multiplesCursos.length;
    if (count > 0) {
      const ids = this.multiplesCursos.map(c => c.cursoId).join(', ');
      this.multipleInfo = `✅ ${count} detectados con IDs: ${ids}`;
    } else {
      this.multipleInfo = '❌ No hay ContentChildren';
    }
  }
}
```

**Padre proyecta MÚLTIPLES componentes:**

```typescript
@Component({
  selector: 'app-demo-wrapper',
  template: `
    <app-demo>
      <app-curso-detalle multiple [cursoId]="1"></app-curso-detalle>
      <app-curso-detalle multiple [cursoId]="2"></app-curso-detalle>
      <app-curso-detalle multiple [cursoId]="3"></app-curso-detalle>
    </app-demo>
  `
})
export class DemoWrapperComponent {}
```

### Casos de uso reales

```
✅ Tabs dinámicos (número variable de tabs)
✅ Accordion con secciones dinámicas
✅ Carousel con slides configurables
✅ Menu con items dinámicos
✅ Wizard con steps personalizables
```

### Diferencias clave resumidas

| Concepto | Busca en | Cantidad | Uso |
|----------|----------|----------|-----|
| `@ViewChild` | Tu propio template | 1 | Manipular TU DOM |
| `@ViewChildren` | Tu propio template | Múltiples | Operaciones en lote |
| `@ContentChild` | Contenido proyectado | 1 | Detectar hijo proyectado |
| `@ContentChildren` | Contenido proyectado | Múltiples | Detectar hijos proyectados |

### Prueba Práctica

1. Ir a `/demo`
2. Scroll a "ContentChildren"
3. Click en "Contar ContentChildren"
4. **Resultado:** Muestra cuántos componentes fueron proyectados

---

## 9. BONUS: SIGNALS (Angular 17+)

### ¿Qué son los Signals?

**Signals son la nueva forma de hacer ViewChild en Angular moderno (17+).**

Ventajas:
- ✅ Sintaxis más simple
- ✅ No necesitas lifecycle hooks
- ✅ Totalmente reactivos
- ✅ Mejor performance

### Comparación: Decoradores vs Signals

#### Forma Antigua (Decoradores)

```typescript
import { Component, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';

export class DemoComponent implements AfterViewInit {
  @ViewChild('input') input!: ElementRef;
  @ViewChildren('box') boxes!: QueryList<ElementRef>;
  
  ngAfterViewInit() {
    // Ahora puedes usar this.input
    this.input.nativeElement.focus();
  }
  
  enfocar() {
    this.input.nativeElement.focus();
  }
}
```

#### Forma Nueva (Signals) ⚡

```typescript
import { Component, viewChild, viewChildren, effect } from '@angular/core';

export class Demo2Component {
  input = viewChild<ElementRef>('input');
  boxes = viewChildren<ElementRef>('box');
  
  constructor() {
    effect(() => {
      // Se ejecuta automáticamente cuando input está listo
      this.input()?.nativeElement.focus();
    });
  }
  
  enfocar() {
    this.input()?.nativeElement.focus();  // Nota: input() con ()
  }
}
```

### Diferencias clave

| Feature | Decoradores | Signals |
|---------|------------|---------|
| Sintaxis | `@ViewChild('input')` | `viewChild('input')` |
| Acceso | `this.input.nativeElement` | `this.input()?.nativeElement` |
| Lifecycle | `ngAfterViewInit` necesario | `effect()` automático |
| Null safety | `!` o `| undefined` | `?.` natural |
| Reactivo | No | Sí |

### Sintaxis completa de Signals

```typescript
// viewChild - un elemento
input = viewChild<ElementRef>('input');              // Sin required
input = viewChild.required<ElementRef>('input');     // Required (sin ?)

// viewChildren - múltiples elementos  
boxes = viewChildren<ElementRef>('box');

// contentChild - contenido proyectado (uno)
curso = contentChild<CursoComponent>(CursoComponent);

// contentChildren - contenido proyectado (múltiples)
cursos = contentChildren<CursoComponent>(CursoComponent);

// Uso
this.input()?.nativeElement.focus();         // Con ?. por si no existe
this.boxes().forEach(box => ...);            // boxes() devuelve array
this.curso()?.hacerAlgo();                   // Acceso al componente
```

### ¿Cuándo usar cada sintaxis?

```
✅ Proyecto NUEVO (Angular 17+)     → Signals (viewChild, viewChildren)
✅ Proyecto LEGACY (≤ Angular 16)   → Decoradores (@ViewChild, @ViewChildren)
✅ Aprendiendo ahora                → Aprende AMBAS
```

### Archivo demo completo con Signals

**Ver: `src/app/demo/demo2.ts`**

```typescript
import { Component, ElementRef, viewChild, viewChildren, effect } from '@angular/core';

@Component({
  selector: 'app-demo2',
  template: `
    <input #myInputSignal type="text" placeholder="Escribe...">
    <button (click)="enfocarSignal()">🎯 Enfocar</button>
    
    <div class="caja-signal" *ngFor="let num of [1,2,3,4]">
      Caja {{ num }}
    </div>
    <button (click)="resaltarSignal()">✨ Resaltar</button>
    
    <p>Total de cajas: {{ cajasSignal().length }}</p>
  `
})
export class Demo2Component {
  // Signals
  inputSignal = viewChild<ElementRef>('myInputSignal');
  cajasSignal = viewChildren<ElementRef>('.caja-signal');
  
  constructor() {
    // Effect reactivo
    effect(() => {
      console.log('Cajas actuales:', this.cajasSignal().length);
    });
  }
  
  enfocarSignal() {
    this.inputSignal()?.nativeElement.focus();
  }
  
  resaltarSignal() {
    this.cajasSignal().forEach(caja => {
      caja.nativeElement.style.background = 'yellow';
    });
  }
}
```

### Prueba Práctica

1. Ir a http://localhost:4200/demo2
2. Probar los botones (funcionan idéntico a /demo)
3. Misma funcionalidad, sintaxis moderna

---

## EJERCICIOS PRÁCTICOS

### 📝 EJERCICIO 1: Guard Personalizado

**Objetivo:** Crear un guard que verifique si el usuario es premium.

**Pasos:**
1. Crear archivo `src/app/guards/premium.guard.ts`
2. Implementar la función guard
3. Verificar si existe `isPremium = 'true'` en localStorage
4. Si NO es premium, redirigir a `/login` con console.log
5. Aplicar el guard a la ruta `/demo`

**Código base:**

```typescript
// src/app/guards/premium.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const premiumGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isPremium = localStorage.getItem('isPremium');
  
  // TU CÓDIGO AQUÍ
  
};
```

**Aplicar en rutas:**

```typescript
// src/app/app.routes.ts
{ 
  path: 'demo',
  loadComponent: () => import('./demo/demo-wrapper').then(m => m.DemoWrapperComponent),
  canActivate: [premiumGuard]  // 👈 Agregar aquí
}
```

**Testing:**
1. Ir a `/demo` sin ser premium → debe redirigir
2. Ejecutar en consola: `localStorage.setItem('isPremium', 'true')`
3. Ir a `/demo` de nuevo → debe permitir acceso

---

### 📝 EJERCICIO 2: ViewChild para Scroll

**Objetivo:** Botón "Volver arriba" que haga scroll suave.

**Pasos:**
1. Editar `src/app/home/home.ts`
2. Agregar un `<div #top>` al inicio del template
3. Agregar un botón al final con `(click)="volverArriba()"`
4. Usar ViewChild para capturar `#top`
5. Implementar método que haga `scrollIntoView({ behavior: 'smooth' })`

**Código base:**

```typescript
// src/app/home/home.ts
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div #top></div>
    
    <div style="padding: 40px;">
      <h1>Página de Inicio</h1>
      <!-- ... contenido largo ... -->
      <div style="height: 2000px;">Scroll down...</div>
      
      <button (click)="volverArriba()">⬆️ Volver Arriba</button>
    </div>
  `
})
export class Home {
  @ViewChild('top') topElement!: ElementRef;
  
  volverArriba() {
    // TU CÓDIGO AQUÍ
  }
}
```

---

### 📝 EJERCICIO 3: ViewChildren para Contador

**Objetivo:** Cada caja tiene su propio contador de clicks.

**Pasos:**
1. Editar `src/app/demo/demo.ts`
2. Agregar variable: `clickCounts = [0, 0, 0]`
3. Modificar template para mostrar el contador en cada caja
4. Al hacer click en UNA caja, incrementar SOLO su contador
5. Usar ViewChildren para agregar event listeners

**Código base:**

```typescript
// src/app/demo/demo.ts
export class DemoComponent implements AfterViewInit {
  @ViewChildren('caja') cajas!: QueryList<ElementRef>;
  clickCounts = [0, 0, 0];
  
  ngAfterViewInit() {
    this.cajas.forEach((caja, index) => {
      caja.nativeElement.addEventListener('click', () => {
        // TU CÓDIGO AQUÍ
      });
    });
  }
}
```

**Template:**
```html
<div #caja *ngFor="let num of [1,2,3]; let i = index">
  Caja {{ num }}
  <div>Clicks: {{ clickCounts[i] }}</div>
</div>
```

---

### 📝 EJERCICIO AVANZADO: Blog Protegido (Desafío)

**Combina TODO lo aprendido:**

1. Crear módulo "blog" con lazy loading
2. Crear guard "authorGuard" que verifique rol
3. Proteger ruta `/blog/crear` con el guard
4. Componente editor con ViewChild para auto-focus del título
5. Agregar múltiples tags con ViewChildren para validarlos todos

**Estructura sugerida:**
```
src/app/blog/
├── blog.routes.ts
├── blog-list.component.ts
├── blog-create.component.ts (con ViewChild)
└── guards/
    └── author.guard.ts
```

---

## RECURSOS ADICIONALES

### 📚 Documentación Oficial

- [Angular Docs](https://angular.dev) - Documentación oficial moderna
- [Angular Router](https://angular.dev/guide/routing) - Guía completa de routing
- [ViewChild API](https://angular.dev/api/core/ViewChild) - Referencia de ViewChild
- [Signals](https://angular.dev/guide/signals) - Guía completa de signals

### 📺 Videos Recomendados

- [Angular University](https://www.youtube.com/@AngularUniversity) - Tutoriales avanzados
- [Decoded Frontend](https://www.youtube.com/@DecodedFrontend) - Conceptos visuales
- [Joshua Morony](https://www.youtube.com/@JoshuaMorony) - Signals y modern Angular

### 🛠️ Herramientas

- [Angular DevTools](https://chrome.google.com/webstore/detail/angular-devtools/) - Extension de Chrome
- [StackBlitz](https://stackblitz.com) - Editor online para Angular
- [Angular CLI](https://angular.dev/cli) - Herramienta de línea de comandos

### 📦 Librerías para Estudiar ContentChild

- [Angular Material](https://material.angular.io) - Ve cómo usan ContentChild
- [PrimeNG](https://primeng.org) - Componentes que usan proyección de contenido
- [Clarity](https://clarity.design) - Más ejemplos de content projection

---

## RESUMEN FINAL

### 🎯 Conceptos Clave Aprendidos

1. **Routing** → Mapeo de URLs a componentes (SPA)
2. **RouterLink** → Navegación sin recargas
3. **Guards** → Protección de rutas sensibles
4. **Lazy Loading** → Optimización de carga
5. **ViewChild** → Manipular UN elemento de tu template
6. **ViewChildren** → Manipular MÚLTIPLES elementos de tu template
7. **ContentChild** → Detectar UN componente proyectado
8. **ContentChildren** → Detectar MÚLTIPLES componentes proyectados
9. **Signals** → Sintaxis moderna para ViewChild (Angular 17+)

### ✅ Buenas Prácticas

```
DO ✅
- Usa routerLink para navegación interna
- SIEMPRE protege rutas sensibles con guards
- Implementa lazy loading para secciones grandes
- Usa ViewChild en lugar de document.querySelector
- Aprende signals si trabajas con Angular 17+

DON'T ❌
- No uses href para navegación interna
- No dejes rutas admin sin protección
- No cargues todo en el bundle inicial
- No uses document.getElementById en Angular
- No uses solo decoradores si tu proyecto es Angular 17+
```

### 🚀 Próximos Pasos

1. Completar los 3 ejercicios básicos
2. Intentar el ejercicio avanzado del blog
3. Explorar Angular Material para ver ContentChild en acción
4. Crear tu propio proyecto aplicando estos conceptos
5. Aprender sobre Reactive Forms (siguiente nivel)

---

## CHANGELOG

**Versión 1.0** (2026-04-16)
- Guía inicial completa
- 8 conceptos fundamentales cubiertos
- Ejemplos con código del proyecto demo-angular-live
- 3 ejercicios prácticos + 1 avanzado
- Analogías del mundo real
- Comparaciones decoradores vs signals

---

**📝 Nota:** Esta guía está basada en el proyecto `demo-angular-live` y usa Angular 18 standalone components.

**🎉 ¡Éxito en tu aprendizaje de Angular! 🎉**
