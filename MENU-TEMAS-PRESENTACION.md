# 🎯 MENÚ DE TEMAS - DEMO ANGULAR

> **Guía visual para el instructor durante la presentación**
> Usa este menú para mostrar a los estudiantes qué veremos en cada bloque

---

## 📋 HOJA DE RUTA DE LA MENTORÍA

```
┌─────────────────────────────────────────────────────────────────┐
│                    🚀 DEMO ANGULAR - 5.5 HORAS                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🗺️ BLOQUE 1: NAVEGACIÓN (30 min)
### ⏰ Tiempo: 00:00 - 00:30

<details open>
<summary><b>📍 TEMAS QUE VEREMOS</b></summary>

### 1️⃣ Routing Básico
- ✅ ¿Qué es una SPA (Single Page Application)?
- ✅ Configuración de rutas en `app.routes.ts`
- ✅ Router Outlet - El contenedor de vistas
- ✅ Rutas con parámetros (`/curso/:id`)
- ✅ Rutas hijas (children routes)
- ✅ Wildcard routes (404)
- ✅ Redirecciones automáticas

**📂 Archivos a mostrar:**
- `src/app/app.routes.ts`
- `src/app/app.html` (router-outlet)
- `src/app/cursos/cursos.routes.ts` (rutas hijas)

**🌐 Demos en navegador:**
- Navegar entre rutas y ver que NO se recarga la página
- Abrir DevTools → Network para demostrar

---

### 2️⃣ RouterLink
- ✅ Enlaces sin recarga (`<a routerLink="/home">`)
- ✅ Diferencia entre `href` vs `routerLink`
- ✅ RouterLink con parámetros dinámicos
- ✅ Query params (`?page=2&search=angular`)
- ✅ Rutas relativas (`../back`)
- ✅ RouterLinkActive (clase CSS automática)
- ✅ Navegación programática con Router

**📂 Archivos a mostrar:**
- `src/app/home/home.html` (ejemplos de routerLink)
- `src/app/app.html` (navegación principal)

**🌐 Demos en navegador:**
- Click en enlaces y ver URL cambiar sin reload
- Inspeccionar elementos con routerLinkActive

</details>

---

## 🛡️ BLOQUE 2: SEGURIDAD Y PERFORMANCE (25 min)
### ⏰ Tiempo: 00:30 - 00:55

<details open>
<summary><b>📍 TEMAS QUE VEREMOS</b></summary>

### 3️⃣ Guards (Protección de Rutas)
- ✅ ¿Qué es un guard? (Guardia de seguridad)
- ✅ canActivate - Proteger rutas
- ✅ Verificar autenticación con localStorage
- ✅ Redirección automática a `/login`
- ✅ Guards funcionales (Angular moderno)
- ✅ Mensajes de consola para debugging

**📂 Archivos a mostrar:**
- `src/app/guards/auth.guard.ts`
- `src/app/app.routes.ts` (canActivate)

**🌐 Demos en navegador:**
1. Intentar ir a `/cursos` SIN login → Redirige a `/login`
2. Hacer login
3. Intentar ir a `/cursos` CON login → Permite acceso
4. Ver logs en DevTools Console

---

### 4️⃣ Lazy Loading
- ✅ ¿Qué es lazy loading? (Carga perezosa)
- ✅ loadComponent - Cargar componente bajo demanda
- ✅ loadChildren - Cargar módulo de rutas
- ✅ Code splitting automático
- ✅ Optimización de performance
- ✅ Chunks de JavaScript separados

**📂 Archivos a mostrar:**
- `src/app/app.routes.ts` (loadComponent, loadChildren)

**🌐 Demos en navegador:**
1. Abrir DevTools → Network → Filtrar JS
2. Limpiar network log
3. Navegar a `/demo`
4. Ver chunk de lazy loading descargándose en tiempo real
5. Mostrar tamaño de archivos

</details>

---

## ☕ BREAK (5 min)
### ⏰ Tiempo: 00:55 - 01:00

---

## 🔍 BLOQUE 3: MANIPULACIÓN DEL DOM - Parte 1 (30 min)
### ⏰ Tiempo: 01:00 - 01:30

<details open>
<summary><b>📍 TEMAS QUE VEREMOS</b></summary>

### 5️⃣ ViewChild (Acceso a UN elemento)
- ✅ ¿Qué es ViewChild? (Referencia al DOM)
- ✅ Decorador @ViewChild
- ✅ ElementRef para elementos HTML nativos
- ✅ Acceso a componentes hijos
- ✅ Lifecycle: disponible en ngAfterViewInit
- ✅ Manipulación del DOM (focus, scroll, estilos)

**📂 Archivos a mostrar:**
- `src/app/demo/demo.ts` (línea del @ViewChild)
- `src/app/demo/demo.html` (template con #messageInput)

**🌐 Demos en navegador:**
1. Ir a `/demo`
2. Ver sección "ViewChild - Enfocar un input"
3. Click en botón "🎯 Enfocar"
4. Ver input recibir focus automáticamente
5. Ver logs en consola

---

### 6️⃣ ViewChildren (Acceso a MÚLTIPLES elementos)
- ✅ ¿Qué es ViewChildren?
- ✅ Decorador @ViewChildren
- ✅ QueryList (lista observable)
- ✅ Iterar sobre elementos
- ✅ toArray() para conversión
- ✅ changes observable

**📂 Archivos a mostrar:**
- `src/app/demo/demo.ts` (@ViewChildren)
- `src/app/demo/demo.html` (template con múltiples #box)

**🌐 Demos en navegador:**
1. Ver sección "ViewChildren - Resaltar todas las cajas"
2. Click en "✨ Resaltar Todas"
3. Ver las 3 cajas cambiar a amarillo
4. Ver logs en consola (QueryList)

</details>

---

## 🎁 BLOQUE 4: MANIPULACIÓN DEL DOM - Parte 2 (20 min)
### ⏰ Tiempo: 01:30 - 01:50

<details open>
<summary><b>📍 TEMAS QUE VEREMOS</b></summary>

### 7️⃣ ContentChild (Proyección simple)
- ✅ ¿Qué es ContentChild?
- ✅ Diferencia ViewChild vs ContentChild
- ✅ ng-content (proyección de contenido)
- ✅ Decorador @ContentChild
- ✅ Disponible en ngAfterContentInit
- ✅ Casos de uso (componentes wrapper)

**📂 Archivos a mostrar:**
- `src/app/demo/demo-wrapper.ts` (padre con ContentChild)
- `src/app/demo/demo.ts` (hijo con ng-content)
- `src/app/demo/demo.html` (ver <ng-content>)

**🌐 Demos en navegador:**
1. Ver sección "ContentChild"
2. Click en "📊 Mostrar info del ContentChild"
3. Ver logs detectando componente proyectado
4. Explicar diagrama ViewChild vs ContentChild

---

### 8️⃣ ContentChildren (Proyección múltiple)
- ✅ ¿Qué es ContentChildren?
- ✅ QueryList de contenido proyectado
- ✅ Múltiples elementos proyectados
- ✅ Uso en librerías (Angular Material)

**📂 Archivos a mostrar:**
- `src/app/demo/demo-wrapper.ts` (@ContentChildren)

**🌐 Demos en navegador:**
- Mostrar concepto con dibujo/diagrama
- Ejemplos de Angular Material (tabs, accordion)

</details>

---

## ☕ BREAK (10 min)
### ⏰ Tiempo: 01:50 - 02:00

---

## ⚡ BLOQUE 5: ANGULAR MODERNO - SIGNALS (15 min)
### ⏰ Tiempo: 02:00 - 02:15

<details open>
<summary><b>📍 TEMAS QUE VEREMOS</b></summary>

### 9️⃣ Signals (Angular 17+)
- ✅ ¿Qué son Signals?
- ✅ viewChild() signal vs @ViewChild
- ✅ viewChildren() signal vs @ViewChildren
- ✅ contentChild() signal
- ✅ contentChildren() signal
- ✅ Sintaxis moderna más simple
- ✅ No necesita ngAfterViewInit
- ✅ Acceso con ()

**📂 Archivos a mostrar:**
- `src/app/demo/demo2.ts` (con signals)
- `src/app/demo/demo.ts` (con decoradores)
- Comparar lado a lado

**🌐 Demos en navegador:**
1. Ir a `/demo2`
2. Probar mismas funcionalidades
3. Ver diferencias en código
4. Explicar cuándo usar cada uno

---

### 🔟 Standalone Components
- ✅ Componentes sin módulos
- ✅ Imports directos
- ✅ App config moderno
- ✅ Futuro de Angular

**📂 Archivos a mostrar:**
- `src/app/app.config.ts`
- Cualquier componente (todos son standalone)

</details>

---

## 🔄 BLOQUE 6: CONTROL FLOW MODERNO (20 min)
### ⏰ Tiempo: 02:15 - 02:35

<details open>
<summary><b>📍 TEMAS QUE VEREMOS</b></summary>

### 1️⃣1️⃣ @if (Control de flujo condicional)
- ✅ Sintaxis @if moderna
- ✅ @else, @else if
- ✅ Renderizado condicional
- ✅ Diferencia vs *ngIf

**📂 Archivos a mostrar:**
- `src/app/examples/control-flow-example/control-flow-example.html`

**🌐 Demos en navegador:**
- Ir a la ruta del ejemplo de control flow
- Mostrar show/hide dinámico

---

### 1️⃣2️⃣ @for (Iteración sobre listas)
- ✅ Sintaxis @for moderna
- ✅ track obligatorio
- ✅ $index, $first, $last, $even, $odd
- ✅ @empty
- ✅ Diferencia vs *ngFor

**📂 Archivos a mostrar:**
- `src/app/examples/control-flow-example/control-flow-example.html`

**🌐 Demos en navegador:**
- Mostrar lista de productos
- Explicar por qué track es importante

---

### 1️⃣3️⃣ @switch (Múltiples casos)
- ✅ Sintaxis @switch
- ✅ @case, @default
- ✅ Diferencia vs *ngSwitch

---

### 1️⃣4️⃣ @let (Variables locales)
- ✅ Declaración de variables en templates
- ✅ Cálculos inline
- ✅ Reutilización de expresiones

</details>

---

## 🔄 BLOQUE 7: LIFECYCLE HOOKS (25 min)
### ⏰ Tiempo: 02:35 - 03:00

<details open>
<summary><b>📍 TEMAS QUE VEREMOS</b></summary>

### Hooks del Ciclo de Vida

#### 1️⃣5️⃣ constructor
- ✅ Inyección de dependencias
- ✅ Se ejecuta PRIMERO

#### 1️⃣6️⃣ ngOnChanges
- ✅ Cambios en @Input
- ✅ SimpleChanges
- ✅ Múltiples ejecuciones

#### 1️⃣7️⃣ ngOnInit
- ✅ Inicialización del componente
- ✅ Cargar datos
- ✅ UNA sola vez

#### 1️⃣8️⃣ ngDoCheck
- ✅ Detección manual de cambios
- ✅ ⚠️ Cuidado con performance

#### 1️⃣9️⃣ ngAfterContentInit
- ✅ Contenido proyectado inicializado
- ✅ ContentChild disponible

#### 2️⃣0️⃣ ngAfterContentChecked
- ✅ Verificación de contenido

#### 2️⃣1️⃣ ngAfterViewInit
- ✅ Vista inicializada
- ✅ ViewChild disponible
- ✅ Acceso seguro al DOM

#### 2️⃣2️⃣ ngAfterViewChecked
- ✅ Verificación de vista

#### 2️⃣3️⃣ ngOnDestroy
- ✅ Limpieza de recursos
- ✅ Unsubscribe
- ✅ Clear timers

**📂 Archivos a mostrar:**
- `src/app/examples/lifecycle-example/lifecycle-example.ts`

**🌐 Demos en navegador:**
- Ir a la ruta del ejemplo de lifecycle
- Ver logs en tiempo real
- Probar timer para ver hooks en acción

</details>

---

## 📝 BLOQUE 8: FORMULARIOS (25 min)
### ⏰ Tiempo: 03:00 - 03:25

<details open>
<summary><b>📍 TEMAS QUE VEREMOS</b></summary>

### 2️⃣4️⃣ Template-Driven Forms
- ✅ ngModel
- ✅ FormsModule
- ✅ Two-way binding [(ngModel)]
- ✅ Validación básica

### 2️⃣5️⃣ Reactive Forms
- ✅ FormControl
- ✅ FormGroup
- ✅ FormBuilder
- ✅ Validators (required, minLength, etc.)
- ✅ Validación personalizada
- ✅ Estado del formulario

### 2️⃣6️⃣ Validaciones
- ✅ required, minLength, maxLength
- ✅ pattern, email
- ✅ Custom validators
- ✅ Mensajes de error

**📂 Archivos a mostrar:**
- `src/app/examples/forms-example/forms-example.ts`
- `src/app/examples/forms-example/forms-example.html`

**🌐 Demos en navegador:**
- Ir a la ruta del ejemplo de forms
- Probar validaciones en vivo
- Mostrar mensajes de error

</details>

---

## 📝 BLOQUE 8: FORMULARIOS (25 min)
### ⏰ Tiempo: 03:00 - 03:25

<details open>
<summary><b>📍 TEMAS QUE VEREMOS</b></summary>

### 2️⃣4️⃣ Template-Driven Forms
- ✅ ngModel
- ✅ FormsModule
- ✅ Two-way binding [(ngModel)]
- ✅ Validación básica

### 2️⃣5️⃣ Reactive Forms
- ✅ FormControl
- ✅ FormGroup
- ✅ FormBuilder
- ✅ Validators (required, minLength, etc.)
- ✅ Validación personalizada
- ✅ Estado del formulario

### 2️⃣6️⃣ Validaciones
- ✅ required, minLength, maxLength
- ✅ pattern, email
- ✅ Custom validators
- ✅ Mensajes de error

**📂 Archivos a mostrar:**
- `src/app/examples/forms-example/forms-example.ts`
- `src/app/examples/forms-example/forms-example.html`

**🌐 Demos en navegador:**
- Ir a la ruta del ejemplo de forms
- Probar validaciones en vivo
- Mostrar mensajes de error

</details>

---

## 🌊 BLOQUE 11: RXJS OBSERVABLES (30 min)
### ⏰ Tiempo: 03:25 - 03:55

<details open>
<summary><b>📍 TEMAS QUE VEREMOS</b></summary>

### 2️⃣7️⃣ RxJS Operators - Operadores Importantes

#### Operadores de Transformación
- ✅ map() - Transformar cada valor
- ✅ tap() - Side effects sin modificar

#### Operadores de Filtrado
- ✅ filter() - Filtrar valores
- ✅ debounceTime() - Esperar antes de emitir
- ✅ distinctUntilChanged() - Solo valores únicos

#### Operadores de Combinación
- ✅ switchMap() - Cancelar petición anterior
- ✅ mergeMap() - Ejecutar todas en paralelo
- ✅ combineLatest() - Combinar múltiples streams

#### Operadores de Control
- ✅ take() - Limitar número de emisiones
- ✅ takeUntil() - Completar en señal (prevenir memory leaks)
- ✅ catchError() - Manejo robusto de errores

#### Subjects
- ✅ Subject - Emisor y observable
- ✅ BehaviorSubject - Con valor inicial
- ✅ ReplaySubject - Cachea valores

**📂 Archivos a mostrar:**
- `src/app/examples/rxjs-operators-example/rxjs-operators-example.ts`
- `src/app/examples/rxjs-operators-example/rxjs-operators-example.html`

**🌐 Demos en navegador:**
1. Ir a `/examples/rxjs`
2. Ejecutar cada operador individualmente
3. Ver logs en tiempo real
4. Demostrar búsqueda con debounceTime
5. Comparar switchMap vs mergeMap
6. Mostrar catchError manejando errores
7. Ver logs de takeUntil en ngOnDestroy

**💡 Conceptos Clave:**
- debounceTime es ESENCIAL en búsquedas
- switchMap para búsquedas (cancela anteriores)
- mergeMap para múltiples peticiones paralelas
- takeUntil SIEMPRE para prevenir memory leaks
- catchError para no romper el stream

</details>

---

## ⚡ BLOQUE 12: SIGNALS AVANZADO (25 min)
### ⏰ Tiempo: 03:55 - 04:20

<details open>
<summary><b>📍 TEMAS QUE VEREMOS</b></summary>

### 2️⃣8️⃣ Signals Completo - Sistema de Reactividad Moderno

#### Signals Básicos
- ✅ signal() - Crear signal
- ✅ .set() - Establecer valor directo
- ✅ .update() - Actualizar basado en valor anterior
- ✅ () - Leer el valor actual

#### Computed Signals
- ✅ computed() - Valores derivados
- ✅ Recálculo automático
- ✅ Optimización de performance
- ✅ Memoización integrada

#### Effects
- ✅ effect() - Efectos secundarios
- ✅ Auto-tracking de dependencias
- ✅ Uso para logs, analytics, localStorage

#### Signals con Estructuras
- ✅ Signals con objetos
- ✅ Signals con arrays
- ✅ Actualización inmutable

#### Comparación
- ✅ Signals vs RxJS
- ✅ Cuándo usar cada uno
- ✅ Performance comparado
- ✅ No requiere unsubscribe

**📂 Archivos a mostrar:**
- `src/app/examples/signals-example/signals-example.ts`
- `src/app/examples/signals-example/signals-example.html`

**🌐 Demos en navegador:**
1. Ir a `/examples/signals`
2. Demo contador con .set() y .update()
3. Demo computed con doubleCount
4. Demo effect con múltiplos de 5
5. Demo TO-DO list completo:
   - Agregar tareas
   - Marcar como completadas
   - Ver estadísticas actualizarse automáticamente
   - Filtros (all, completed, pending)
   - Progreso visual
6. Modificar usuario (objeto signal)
7. Ver logs de todas las operaciones

**💡 Conceptos Clave:**
- Signals son más simples que RxJS
- computed() se recalcula automáticamente
- No hay subscribe/unsubscribe
- Mejor performance (fine-grained reactivity)
- Usa Signals para estado local
- Usa RxJS para operaciones asíncronas complejas

</details>

---

## 🎨 BLOQUE 9: CONCEPTOS BASE (10 min)
### ⏰ Tiempo: 04:20 - 04:30

<details open>
<summary><b>📍 TEMAS QUE VEREMOS</b></summary>

### Conceptos Fundamentales

#### 2️⃣7️⃣ Property Binding
- ✅ [property]="value"

#### 2️⃣8️⃣ Event Binding
- ✅ (event)="handler()"

#### 2️⃣9️⃣ Interpolation
- ✅ {{ variable }}

#### 3️⃣0️⃣ Two-Way Binding
- ✅ [(ngModel)]
- ✅ Banana in a box

#### 3️⃣1️⃣ Directivas
- ✅ CommonModule
- ✅ FormsModule

#### 3️⃣2️⃣ Servicios y Dependency Injection
- ✅ inject() function
- ✅ Constructor injection

#### 3️⃣3️⃣ Pipes
- ✅ Built-in pipes
- ✅ Custom pipes

</details>

---

## 💪 EJERCICIOS PRÁCTICOS (40 min)
### ⏰ Tiempo: 04:30 - 05:10

<details open>
<summary><b>📍 ACTIVIDAD PRÁCTICA</b></summary>

### Ejercicios Asignados

**Nivel Básico:**
1. Guard Premium
2. Scroll Suave con ViewChild
3. Contador Individual con ViewChildren

**Nivel Intermedio:**
4. Formulario con Validación ViewChildren
5. Navegación con Breadcrumbs
6. Tab Component con ContentChildren

**Nivel Avanzado:**
7. Blog Completo con Lazy Loading
8. Sistema de Permisos Multi-Guard
9. Carousel Interactivo

**Ejercicios Nuevos:**
10. Buscador con debounceTime y switchMap
11. Carrito de compras con Signals
12. Formulario de registro completo con validaciones custom

**📂 Ver detalles en:**
- `EJERCICIOS-PRACTICOS.md`

</details>

---

## ❓ Q&A Y CIERRE (20 min)
### ⏰ Tiempo: 05:10 - 05:30

- Preguntas abiertas
- Aclaraciones de conceptos
- Recursos adicionales
- Próximos pasos
- Tareas para casa

---

## 📊 RESUMEN FINAL

```
┌────────────────────────────────────────────────────────┐
│           TEMAS CUBIERTOS EN ESTA MENTORÍA             │
├────────────────────────────────────────────────────────┤
│  ✅ Routing y Navegación        →  2 temas            │
│  ✅ Seguridad y Performance     →  2 temas            │
│  ✅ Manipulación del DOM        →  4 temas            │
│  ✅ Angular Moderno (Signals)   →  2 temas            │
│  ✅ Control Flow                →  4 temas            │
│  ✅ Lifecycle Hooks             →  9 temas            │
│  ✅ Formularios                 →  3 temas            │
│  ✅ RxJS Observables            →  1 tema (10 ops)    │
│  ✅ Signals Avanzado            →  1 tema             │
│  ✅ Conceptos Base              →  7 temas            │
├────────────────────────────────────────────────────────┤
│  TOTAL: 35 CONCEPTOS FUNDAMENTALES                     │
│  + 10 Operadores RxJS                                  │
│  = 45+ SKILLS PROFESIONALES                            │
└────────────────────────────────────────────────────────┘
```

---

## 🎯 TIPS PARA EL INSTRUCTOR

### ✅ Hacer:
- Mostrar código ANTES de explicar
- Usar analogías del mundo real
- Preguntar constantemente "¿Tiene sentido?"
- Usar console.log para visualizar flujo
- Comparar con vanilla JS

### ❌ Evitar:
- Leer código línea por línea
- Asumir conocimiento previo
- Saltar entre archivos sin explicar
- Ir demasiado rápido

---

## 📚 ARCHIVOS DE REFERENCIA

- `GUIA-MENTORIA-ANGULAR.md` - Guía completa detallada
- `REFERENCIA-RAPIDA.md` - Cheatsheet de consulta rápida
- `EJERCICIOS-PRACTICOS.md` - 9 ejercicios prácticos
- `DIALOGO-CLASE-MENTORIA.md` - Script detallado
- `DIALOGO-CONTROL-FLOW-LIFECYCLE-FORMS.md` - Script adicional

---

## 🚀 ¡LISTO PARA COMENZAR!

**Recuerda:**
1. Abre el proyecto en VS Code
2. Ejecuta `ng serve`
3. Abre http://localhost:4200
4. Abre DevTools
5. Ten este menú visible
6. ¡Disfruta enseñando!

---

**📌 Última actualización:** Mayo 2026  
**📌 Angular Version:** 21.2.0  
**📌 Status:** ✅ Listo para presentación
