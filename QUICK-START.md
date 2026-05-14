# 🚀 QUICK START - Mentoría Angular

## 📋 Para Instructores (5 min setup)

### 1. Setup Rápido
```bash
cd demo-angular-live
npm install
ng serve
# Abrir http://localhost:4200
```

### 2. Archivos Clave a Revisar
- ✅ `GUIA-MENTORIA-ANGULAR.md` - Teoría completa
- ✅ `REFERENCIA-RAPIDA.md` - Cheatsheet
- ✅ `EJERCICIOS-PRACTICOS.md` - 9 ejercicios prácticos
- ✅ `README-MENTORIA.md` - Instrucciones completas

### 3. Flujo de Clase (2.5 horas)
```
00:00-00:10  Introducción
00:10-00:40  Routing + RouterLink
00:40-01:05  Guards + Lazy Loading
01:05-01:10  BREAK
01:10-01:40  ViewChild + ViewChildren
01:40-02:05  ContentChild + ContentChildren
02:05-02:10  BREAK
02:10-02:20  Bonus: Signals
02:20-02:45  Ejercicios prácticos
02:45-03:00  Q&A
```

### 4. Rutas de Demo
| URL | Demo |
|-----|------|
| `/` | Home con navegación |
| `/login` | Login simulado |
| `/cursos` | Rutas con guard (requiere login) |
| `/demo` | ViewChild con decoradores |
| `/demo2` | ViewChild con signals |

### 5. Pruebas Rápidas
**Guard:**
1. Ir a `/cursos` sin login → redirige a `/login`
2. Hacer login → acceso permitido

**Lazy Loading:**
1. DevTools → Network → JS
2. Navegar a `/demo` → ver chunk descargándose

**ViewChild:**
1. Ir a `/demo`
2. Click "Enfocar" → input recibe focus
3. Click "Resaltar Todas" → 3 cajas amarillas

---

## 📚 Para Estudiantes (Study Path)

### Día 1: Teoría Básica
- [ ] Leer secciones 1-4 de `GUIA-MENTORIA-ANGULAR.md`
- [ ] Probar todas las demos en el navegador
- [ ] Entender: Routing, RouterLink, Guards, Lazy Loading

### Día 2-3: Práctica Básica
- [ ] Ejercicio 1: Guard Premium (15 min)
- [ ] Ejercicio 2: Scroll con ViewChild (20 min)
- [ ] Ejercicio 3: Contador ViewChildren (25 min)

### Día 4-5: Teoría Avanzada
- [ ] Leer secciones 5-8 de `GUIA-MENTORIA-ANGULAR.md`
- [ ] Entender: ViewChild, ViewChildren, ContentChild, ContentChildren
- [ ] Practicar: Ejercicios 4-6 (intermedios)

### Día 6-7: Proyecto Final
- [ ] Ejercicio 7: Blog completo (90 min)
- [ ] Aplicar todos los conceptos aprendidos
- [ ] Crear tu propio proyecto

---

## 🎯 Conceptos Esenciales (1 página)

### 1. ROUTING
**Qué es:** Mapeo de URLs a componentes  
**Para qué:** SPA sin recargas  
**Cuándo:** Apps con múltiples vistas  
```typescript
// app.routes.ts
{ path: 'home', component: HomeComponent }
```

### 2. ROUTERLINK
**Qué es:** Directiva para navegación SPA  
**Para qué:** Links sin recargas  
**Cuándo:** Navegación interna  
```html
<a routerLink="/home">Home</a>
```

### 3. GUARDS
**Qué es:** Función que controla acceso a rutas  
**Para qué:** Protección y seguridad  
**Cuándo:** Rutas que requieren permisos  
```typescript
export const authGuard: CanActivateFn = (route, state) => {
  return !!localStorage.getItem('token');
};
```

### 4. LAZY LOADING
**Qué es:** Cargar código bajo demanda  
**Para qué:** Optimizar bundle inicial  
**Cuándo:** Módulos grandes opcionales  
```typescript
{
  path: 'admin',
  loadComponent: () => import('./admin').then(m => m.AdminComponent)
}
```

### 5. VIEWCHILD
**Qué es:** Referencias a elementos del template  
**Para qué:** Manipular DOM directamente  
**Cuándo:** Focus, scroll, animaciones  
```typescript
@ViewChild('input') input!: ElementRef;
this.input.nativeElement.focus();
```

### 6. VIEWCHILDREN
**Qué es:** Referencias a múltiples elementos  
**Para qué:** Operaciones en lote  
**Cuándo:** Lista de elementos similar  
```typescript
@ViewChildren('box') boxes!: QueryList<ElementRef>;
this.boxes.forEach(box => ...);
```

### 7. CONTENTCHILD
**Qué es:** Referencia a contenido proyectado  
**Para qué:** Componentes flexibles  
**Cuándo:** Crear librerías de UI  
```typescript
@ContentChild(TabComponent) tab!: TabComponent;
```

### 8. SIGNALS (Angular 17+)
**Qué es:** Nueva sintaxis para queries  
**Para qué:** Código más simple y reactivo  
**Cuándo:** Proyectos Angular 17+  
```typescript
input = viewChild<ElementRef>('input');
this.input()?.nativeElement.focus();
```

---

## 🔥 Comparaciones Rápidas

### href vs routerLink
```html
<!-- ❌ Recarga página -->
<a href="/home">Home</a>

<!-- ✅ Sin recargas -->
<a routerLink="/home">Home</a>
```

### document vs ViewChild
```typescript
// ❌ No type-safe, frágil
document.getElementById('input').focus();

// ✅ Type-safe, reactivo
@ViewChild('input') input!: ElementRef;
this.input.nativeElement.focus();
```

### ViewChild vs ContentChild
```typescript
// ViewChild: Tu propio template
@ViewChild('myElement') element!: ElementRef;

// ContentChild: Contenido del padre
@ContentChild(ChildComponent) child!: ChildComponent;
```

### Decoradores vs Signals
```typescript
// Decoradores (Angular ≤16)
@ViewChild('input') input!: ElementRef;
ngAfterViewInit() { ... }

// Signals (Angular 17+)
input = viewChild<ElementRef>('input');
constructor() { effect(() => ...) }
```

---

## ⚠️ Errores Comunes

### 1. ViewChild undefined
```typescript
// ❌ MAL
ngOnInit() {
  this.input.nativeElement.focus(); // undefined!
}

// ✅ BIEN
ngAfterViewInit() {
  this.input.nativeElement.focus();
}
```

### 2. Olvidar guard
```typescript
// ❌ MAL - sin protección
{ path: 'admin', component: AdminComponent }

// ✅ BIEN - con guard
{ 
  path: 'admin', 
  component: AdminComponent,
  canActivate: [authGuard]
}
```

### 3. No usar lazy loading
```typescript
// ❌ MAL - carga todo al inicio
{ path: 'blog', component: BlogComponent }

// ✅ BIEN - lazy loading
{ 
  path: 'blog',
  loadComponent: () => import('./blog').then(m => m.BlogComponent)
}
```

---

## 📊 Cheatsheet de Sintaxis

### Crear Guard
```bash
ng g guard guards/auth
```
```typescript
export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  if (token) return true;
  inject(Router).navigate(['/login']);
  return false;
};
```

### Aplicar Guard
```typescript
{
  path: 'protected',
  component: ProtectedComponent,
  canActivate: [authGuard]
}
```

### ViewChild completo
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

### ViewChildren completo
```typescript
import { ViewChildren, QueryList } from '@angular/core';

@Component({
  template: `
    <div #box *ngFor="let i of [1,2,3]">Box {{i}}</div>
    <button (click)="highlightAll()">Highlight</button>
  `
})
export class MyComponent {
  @ViewChildren('box') boxes!: QueryList<ElementRef>;
  
  highlightAll() {
    this.boxes.forEach(box => {
      box.nativeElement.style.background = 'yellow';
    });
  }
}
```

### Lazy Loading
```typescript
// loadComponent (1 componente)
{
  path: 'about',
  loadComponent: () => import('./about').then(m => m.AboutComponent)
}

// loadChildren (módulo completo)
{
  path: 'admin',
  loadChildren: () => import('./admin/routes').then(m => m.ADMIN_ROUTES)
}
```

---

## 🎓 Recursos Útiles

### Documentación
- [Angular Docs](https://angular.dev)
- [Router Guide](https://angular.dev/guide/routing)
- [ViewChild API](https://angular.dev/api/core/ViewChild)

### Videos
- [Angular University](https://www.youtube.com/@AngularUniversity)
- [Decoded Frontend](https://www.youtube.com/@DecodedFrontend)

### Tools
- [Angular DevTools](https://chrome.google.com/webstore/detail/angular-devtools/) (Chrome)
- [StackBlitz](https://stackblitz.com) (Editor online)

---

## ✅ Checklist de Aprendizaje

### Básico
- [ ] Entiendo qué es routing y para qué sirve
- [ ] Puedo crear rutas básicas
- [ ] Sé usar routerLink en lugar de href
- [ ] Entiendo cómo funciona router-outlet
- [ ] Puedo crear un guard funcional
- [ ] Sé aplicar guards a rutas

### Intermedio
- [ ] Puedo implementar lazy loading con loadComponent
- [ ] Puedo implementar lazy loading con loadChildren
- [ ] Entiendo qué es ViewChild y cuándo usarlo
- [ ] Puedo usar ViewChildren para operaciones en lote
- [ ] Entiendo el lifecycle de ViewChild (ngAfterViewInit)
- [ ] Puedo manipular elementos con nativeElement

### Avanzado
- [ ] Entiendo la diferencia entre ViewChild y ContentChild
- [ ] Puedo usar ng-content para proyección de contenido
- [ ] Sé crear componentes flexibles con ContentChild
- [ ] Conozco la sintaxis de signals (viewChild)
- [ ] Puedo decidir cuándo usar decoradores vs signals
- [ ] Puedo combinar todos los conceptos en un proyecto

---

## 🚀 Comandos Rápidos

```bash
# Servir app
ng serve

# Crear componente
ng g c mi-componente --standalone

# Crear guard
ng g guard guards/auth

# Crear servicio
ng g s services/auth

# Build producción
ng build

# Tests
ng test
```

---

## 💡 Tips Finales

### Para Instructores
✅ Usa DevTools para mostrar lazy loading en acción  
✅ Agrega console.logs abundantes para debugging visible  
✅ Haz preguntas frecuentes para verificar comprensión  
✅ Usa analogías: Netflix, guardias, cajas de regalo  

### Para Estudiantes
✅ Practica DESPUÉS de entender la teoría  
✅ No copies código sin entender qué hace  
✅ Usa console.log para ver el flujo de ejecución  
✅ Pregunta "¿Por qué?" en lugar de solo "¿Cómo?"  

---

## 📞 Soporte

**Problema técnico:** Revisa README-MENTORIA.md sección "Problemas Comunes"  
**Duda conceptual:** Lee GUIA-MENTORIA-ANGULAR.md sección correspondiente  
**Referencia rápida:** Usa REFERENCIA-RAPIDA.md como cheatsheet  
**Práctica:** Haz los ejercicios de EJERCICIOS-PRACTICOS.md  

---

**🎉 ¡Éxito en tu mentoría/aprendizaje! 🎉**

---

**Versión:** 1.0.0 | **Última actualización:** Abril 2026 | **Angular:** 18.x
